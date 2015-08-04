Proof-of-Work Hashcash 测试

[测试页面](http://http://121.43.101.95/login.php)

详细规则查看页面源文件。

Hashcash 有很大的弱点，每次计算不依赖之前结果，因此大量并发计算可轻松解题，尤其适用于 GPU。

更好的方案是 slowhash，将并行计算变成串行。同时尝试 UGC 模式，利用每个用户的空闲 CPU，参与问题和答案的贡献。
