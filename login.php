<?php
session_start();

if (isset($_SESSION['login'])) {
	die('你已登陆！<a href="win.txt">成功日志</a>');
}

if (!isset($_SESSION['birth'])) {
	$_SESSION['birth'] = time();
	$_SESSION['sys_err'] = 0;
	$_SESSION['ans_err'] = 0;
	$_SESSION['pwd_err'] = 0;
}

if (!isset($_POST['user']) || !isset($_POST['pwd'])) {
	// 生产随机字符串，作为问题
	$ques = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 12);

	// 问题关联会话。
	$_SESSION['pow_ques'] = $ques;
?>
<!doctype html>
<html>
<head>
	<!--
		https://github.com/EtherDream/proof-of-work-hashcash
	-->
	<meta charset="utf-8" />
	<title>hashcash test</title>
	<script src="//lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
</head>
<body>
	<form id="form_login" action="login.php" method="POST">
		<h1>登录测试</h1>
		<div>
			用户: <input name="user" type="text" value="admin" />
		</div>
		<div>
			密码: <input name="pwd" type="password" placeholder="密码是6个数字" />
		</div>

		<!--
			请提供 pow_answ，符合：
			left(md5(pow_ques + pow_answ), 6) == '000000'
		-->
		<input id="pow_ques" name="pow_ques" type="hidden" value="<?php echo $ques?>" />
		<input id="pow_answ" name="pow_answ" type="hidden" />

		<div>
			<button id="btnLogin" type="submit">登录</button>
		</div>
		<img id="imgWait" style="display:none" src="loading.gif" />
	</form>
	<p><a href="win.txt" target="_blank">成功日志</a></p>

	<script src="pow.js"></script>
	<script>
	var wait;

	$('#form_login').submit(function(e) {
		if (Pow.state == Pow.STAT_RESOLVING) {
			wait = true;
			$('#imgWait').show();
			$('#btnLogin').prop('disabled', true);

			e.preventDefault();
		}
	});

	Pow.onReady = function() {
		var ques = $('#pow_ques').val();
		console.log('resolving: %s', ques);

		var tick = +new Date();

		Pow.onResolved = function(ques, answ) {
			var elapse = new Date() - tick;
			console.log('resolved: %s take: %sms', answ, elapse);

			$('#pow_answ').val(answ);

			if (wait) {
				$('#form_login').submit();
			}
		};
		Pow.resolve(ques);
	};
	Pow.thread = 4;
	</script>
</body>
</html>

<?php
} else {
	// POW 参数检查
	if (!isset($_SESSION['pow_ques']) || !isset($_POST['pow_ques'])) {
		$_SESSION['sys_err']++;
		die('missing ques');
	}

	// 问题只能用一次
	$ques = $_SESSION['pow_ques'];
	unset($_SESSION['pow_ques']);

	if ($ques != $_POST['pow_ques']) {
		$_SESSION['sys_err']++;
		die('invalid ques');
	}

	if (!isset($_POST['pow_answ'])) {
		$_SESSION['sys_err']++;
		die('missing answ');
	}
	$answ = $_POST['pow_answ'];

	// POW 校验
	if (substr(md5($ques . $answ), 0, 6) != '000000') {
		$_SESSION['ans_err']++;
		die('incorrect answ');
	}

	//
	// 登录模拟
	//
	if ($_POST['user'] == 'admin' && $_POST['pwd'] == '123456') {
		// 成功
		echo 'login success';
		$_SESSION['login'] = 1;

		// 记录日志
		date_default_timezone_set('PRC');
		$time = date('Y-m-d H:i:s');
		$addr = $_SERVER['REMOTE_ADDR'];
		$take = time() - $_SESSION['birth'];
		$sys_err = $_SESSION['sys_err'];
		$ans_err = $_SESSION['ans_err'];
		$pwd_err = $_SESSION['pwd_err'];

		file_put_contents('win.txt',
			"$time\t$addr\t用时:$take(秒)\t系统错误:$sys_err\t解题错误:$ans_err\t密码错误:$pwd_err\n",
			FILE_APPEND | LOCK_EX
		);
	} else {
		// 失败
		echo 'login fail';
		$_SESSION['pwd_err']++;
	}
}
?>
