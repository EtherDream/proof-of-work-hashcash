<?php
session_start();

if (isset($_SESSION['login'])) {
	die('你已登陆！<a href="win.txt">成功日志</a> | <a href="logoff.php">注销</a>');
}

if (!isset($_SESSION['birth'])) {
	$_SESSION['birth'] = time();
	$_SESSION['sys_err'] = 0;
	$_SESSION['ans_err'] = 0;
	$_SESSION['pwd_err'] = 0;
}

if (!isset($_POST['pwd'])) {
	// 生产随机字符串，作为问题
	$ques = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 12);

	// 问题关联会话。
	$_SESSION['pow_ques'] = $ques;
?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<title>hashcash test</title>
	<script src="//lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
	<script>
	if (!window.console)
		window.console = {log: alert};
	</script>
</head>
<body>
	<form id="form_login" action="login.php" method="POST">
		<h1>登录测试</h1>
		<!--
			查看：https://github.com/EtherDream/proof-of-work-hashcash
		-->
		口令: <input name="pwd" autofocus type="text" value="" />
		<button id="btnLogin" type="submit">登录</button>

		<!--
			请提供 pow_answ，符合：
			left(md5(pow_ques + pow_answ), 6) == '000000'
		-->
		<input id="pow_ques" name="pow_ques" type="hidden" value="<?php echo $ques?>" />
		<input id="pow_answ" name="pow_answ" type="hidden" />

		<img id="imgWait" style="display:none" src="loading.gif" />
	</form>
	<p><a href="win.txt" target="_blank">成功登录的用户</a></p>

	<script src="pow.js"></script>
	<script>
	var waiting;

	$('#form_login').submit(function(e) {

		// 提交时，答案还在解答中。等待解答完成。
		if (Pow.state == Pow.STAT_RESOLVING) {
			waiting = true;
			$('#imgWait').show();
			$('#btnLogin').prop('disabled', true);

			e.preventDefault();
		}
	});

	Pow.onReady = function() {
		var ques = $('#pow_ques').val();
		console.log('resolving: ' + ques);

		var tick = +new Date();

		Pow.onResolved = function(ques, answ) {
			var elapse = new Date() - tick;
			console.log('resolved: ' + answ + ' take: ' + elapse + 'ms');

			// 填写答案
			$('#pow_answ').val(answ);

			if (waiting) {
				$('#form_login').submit();
			}
		};
		Pow.resolve(ques);
	};

	// 默认线程数
	Pow.thread = 4;
	</script>
</body>
</html>

<?php
} else {
	// 参数检查
	if (!isset($_SESSION['pow_ques']) || !isset($_POST['pow_ques'])) {
		$_SESSION['sys_err']++;
		die('missing pow_ques');
	}

	// 问题用一次就过期
	$ques = $_SESSION['pow_ques'];
	unset($_SESSION['pow_ques']);

	if ($ques != $_POST['pow_ques']) {
		$_SESSION['sys_err']++;
		die('invalid pow_ques');
	}

	if (!isset($_POST['pow_answ'])) {
		$_SESSION['sys_err']++;
		die('missing pow_answ');
	}
	$answ = $_POST['pow_answ'];

	// POW 校验
	if (substr(md5($ques . $answ), 0, 6) != '000000') {
		$_SESSION['ans_err']++;
		die('incorrect pow_answ');
	}

	//
	// 登录模拟
	//
	if ($_POST['pwd'] == '13579') {
		// 成功
		echo '登录成功';
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
			"$time\t$addr\t用时:$take(秒)\t参数错误:$sys_err\t解题错误:$ans_err\t密码错误:$pwd_err\n",
			FILE_APPEND | LOCK_EX
		);
	} else {
		// 失败
		echo '密码错误';
		$_SESSION['pwd_err']++;
	}
}
?>
