

class Hashcash {

    static public function task(beg:UInt, end:UInt, x0:UInt, x1:UInt, x2:UInt) : UInt
    {
        for (c4 in beg ... end)
        for (c3 in 32 ... 126)
        for (c2 in 32 ... 126)
        for (c1 in 32 ... 126)
        {
            var x3:UInt = (c4 << 24) | (c3 << 16) | (c2 << 8) | c1;

            var a:UInt = 0x67452301;
            var b:UInt = 0xEFCDAB89;
            var c:UInt = 0x98BADCFE;
            var d:UInt = 0x10325476;

            a = ff(a, b, c, d, x0  , 7 , 0xD76AA478);
            d = ff(d, a, b, c, x1  , 12, 0xE8C7B756);
            c = ff(c, d, a, b, x2  , 17, 0x242070DB);
            b = ff(b, c, d, a, x3  , 22, 0xC1BDCEEE);
            a = ff(a, b, c, d, 128 , 7 , 0xF57C0FAF);
            d = ff(d, a, b, c, 0   , 12, 0x4787C62A);
            c = ff(c, d, a, b, 0   , 17, 0xA8304613);
            b = ff(b, c, d, a, 0   , 22, 0xFD469501);
            a = ff(a, b, c, d, 0   , 7 , 0x698098D8);
            d = ff(d, a, b, c, 0   , 12, 0x8B44F7AF);
            c = ff(c, d, a, b, 0   , 17, 0xFFFF5BB1);
            b = ff(b, c, d, a, 0   , 22, 0x895CD7BE);
            a = ff(a, b, c, d, 0   , 7 , 0x6B901122);
            d = ff(d, a, b, c, 0   , 12, 0xFD987193);
            c = ff(c, d, a, b, 128 , 17, 0xA679438E);
            b = ff(b, c, d, a, 0   , 22, 0x49B40821);

            a = gg(a, b, c, d, x1  , 5 , 0xf61e2562);
            d = gg(d, a, b, c, 0   , 9 , 0xc040b340);
            c = gg(c, d, a, b, 0   , 14, 0x265e5a51);
            b = gg(b, c, d, a, x0  , 20, 0xe9b6c7aa);
            a = gg(a, b, c, d, 0   , 5 , 0xd62f105d);
            d = gg(d, a, b, c, 0   , 9 ,  0x2441453);
            c = gg(c, d, a, b, 0   , 14, 0xd8a1e681);
            b = gg(b, c, d, a, 128 , 20, 0xe7d3fbc8);
            a = gg(a, b, c, d, 0   , 5 , 0x21e1cde6);
            d = gg(d, a, b, c, 128 , 9 , 0xc33707d6);
            c = gg(c, d, a, b, x3  , 14, 0xf4d50d87);
            b = gg(b, c, d, a, 0   , 20, 0x455a14ed);
            a = gg(a, b, c, d, 0   , 5 , 0xa9e3e905);
            d = gg(d, a, b, c, x2  , 9 , 0xfcefa3f8);
            c = gg(c, d, a, b, 0   , 14, 0x676f02d9);
            b = gg(b, c, d, a, 0   , 20, 0x8d2a4c8a);

            a = hh(a, b, c, d, 0   , 4 , 0xfffa3942);
            d = hh(d, a, b, c, 0   , 11, 0x8771f681);
            c = hh(c, d, a, b, 0   , 16, 0x6d9d6122);
            b = hh(b, c, d, a, 128 , 23, 0xfde5380c);
            a = hh(a, b, c, d, x1  , 4 , 0xa4beea44);
            d = hh(d, a, b, c, 128 , 11, 0x4bdecfa9);
            c = hh(c, d, a, b, 0   , 16, 0xf6bb4b60);
            b = hh(b, c, d, a, 0   , 23, 0xbebfbc70);
            a = hh(a, b, c, d, 0   , 4 , 0x289b7ec6);
            d = hh(d, a, b, c, x0  , 11, 0xeaa127fa);
            c = hh(c, d, a, b, x3  , 16, 0xd4ef3085);
            b = hh(b, c, d, a, 0   , 23,  0x4881d05);
            a = hh(a, b, c, d, 0   , 4 , 0xd9d4d039);
            d = hh(d, a, b, c, 0   , 11, 0xe6db99e5);
            c = hh(c, d, a, b, 0   , 16, 0x1fa27cf8);
            b = hh(b, c, d, a, x2  , 23, 0xc4ac5665);

            a = ii(a, b, c, d, x0  , 6 , 0xf4292244);
            d = ii(d, a, b, c, 0   , 10, 0x432aff97);
            c = ii(c, d, a, b, 128 , 15, 0xab9423a7);
            b = ii(b, c, d, a, 0   , 21, 0xfc93a039);
            a = ii(a, b, c, d, 0   , 6 , 0x655b59c3);
            d = ii(d, a, b, c, x3  , 10, 0x8f0ccc92);
            c = ii(c, d, a, b, 0   , 15, 0xffeff47d);
            b = ii(b, c, d, a, x1  , 21, 0x85845dd1);
            a = ii(a, b, c, d, 0   , 6 , 0x6fa87e4f);
            d = ii(d, a, b, c, 0   , 10, 0xfe2ce6e0);
            c = ii(c, d, a, b, 0   , 15, 0xa3014314);
            b = ii(b, c, d, a, 0   , 21, 0x4e0811a1);
            a = ii(a, b, c, d, 128 , 6 , 0xf7537e82);
            d = ii(d, a, b, c, 0   , 10, 0xbd3af235);
            c = ii(c, d, a, b, x2  , 15, 0x2ad7d2bb);
            b = ii(b, c, d, a, 0   , 21, 0xeb86d391);

            a += 0x67452301;

            if ( (a | 0xff000000) == 0xff000000) {
                return x3;
            }
        }

        return 0;
    }

    static private inline function rol(num:UInt, cnt:UInt):UInt {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    static private inline function cmn(q:UInt, a:UInt, b:UInt, x:UInt, s:UInt, t:UInt):UInt {
        return rol(a + q + x + t, s) + b;
    }

    static private inline function ff(a:UInt, b:UInt, c:UInt, d:UInt, x:UInt, s:UInt, t:UInt):UInt {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    static private inline function gg(a:UInt, b:UInt, c:UInt, d:UInt, x:UInt, s:UInt, t:UInt):UInt {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    static private inline function hh(a:UInt, b:UInt, c:UInt, d:UInt, x:UInt, s:UInt, t:UInt):UInt {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    static private inline function ii(a:UInt, b:UInt, c:UInt, d:UInt, x:UInt, s:UInt, t:UInt):UInt {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
}