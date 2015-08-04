var ASM = (function() {
    "use asm";

    // Emscripten 生成的 js 太大了，直接把关键部分抠出来了

    function Ia(a, b, c, d, e) {
        a = a | 0;
        b = b | 0;
        c = c | 0;
        d = d | 0;
        e = e | 0;
        var f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0;
        a = a << 24;
        k = b << 24;
        if (a >>> 0 >= k >>> 0) {
            v = 0;
            return v | 0
        }
        o = c + -680876937 | 0;
        o = o >>> 25 | o << 7;
        n = o + -271733879 | 0;
        l = d + -117830708 + (271733878 - o & -1732584194 | n & -271733879) | 0;
        l = (l >>> 20 | l << 12) + n | 0;
        m = e + -1126478375 + (l & -271733879 ^ -271733879 | l & n) | 0;
        m = (m >>> 15 | m << 17) + l | 0;
        n = (n & ~m | m & l) + -1316259209 | 0;
        o = o + -448152648 | 0;
        p = l + 1200080426 | 0;
        q = m + -1473231341 | 0;
        r = d + -165796510 | 0;
        s = c + -373897302 | 0;
        t = e + -51403784 | 0;
        u = d + -1530992060 | 0;
        v = c + -358537222 | 0;
        j = e + -995338651 | 0;
        i = c + -198630844 | 0;
        h = d + -2054922799 | 0;
        a: while (1) {
            g = 2097152;
            do {
                d = g | a;
                f = 8192;
                do {
                    c = d | f;
                    e = 32;
                    do {
                        b = c | e;
                        x = n + b | 0;
                        x = (x >>> 10 | x << 22) + m | 0;
                        B = o + (l & ~x | x & m) | 0;
                        B = (B >>> 25 | B << 7) + x | 0;
                        A = p + (m & ~B | B & x) | 0;
                        A = (A >>> 20 | A << 12) + B | 0;
                        w = q + (x & ~A | A & B) | 0;
                        w = (w >>> 15 | w << 17) + A | 0;
                        x = x + -45705983 + (B & ~w | w & A) | 0;
                        x = (x >>> 10 | x << 22) + w | 0;
                        B = B + 1770035416 + (A & ~x | x & w) | 0;
                        B = (B >>> 25 | B << 7) + x | 0;
                        A = A + -1958414417 + (w & ~B | B & x) | 0;
                        A = (A >>> 20 | A << 12) + B | 0;
                        w = w + -42063 + (x & ~A | A & B) | 0;
                        w = (w >>> 15 | w << 17) + A | 0;
                        x = x + -1990404162 + (B & ~w | w & A) | 0;
                        x = (x >>> 10 | x << 22) + w | 0;
                        B = B + 1804603682 + (A & ~x | x & w) | 0;
                        B = (B >>> 25 | B << 7) + x | 0;
                        A = A + -40341101 + (w & ~B | B & x) | 0;
                        A = (A >>> 20 | A << 12) + B | 0;
                        z = ~A;
                        w = w + -1502002162 + (x & z | A & B) | 0;
                        w = (w >>> 15 | w << 17) + A | 0;
                        y = ~w;
                        x = x + 1236535329 + (B & y | w & A) | 0;
                        x = (x >>> 10 | x << 22) + w | 0;
                        z = r + B + (x & A | w & z) | 0;
                        z = (z >>> 27 | z << 5) + x | 0;
                        y = A + -1069501632 + (z & w | x & y) | 0;
                        y = (y >>> 23 | y << 9) + z | 0;
                        w = w + 643717713 + (y & x | z & ~x) | 0;
                        w = (w >>> 18 | w << 14) + y | 0;
                        x = s + x + (w & z | y & ~z) | 0;
                        x = (x >>> 12 | x << 20) + w | 0;
                        z = z + -701558691 + (x & y | w & ~y) | 0;
                        z = (z >>> 27 | z << 5) + x | 0;
                        y = y + 38016083 + (z & w | x & ~w) | 0;
                        y = (y >>> 23 | y << 9) + z | 0;
                        w = w + -660478335 + (y & x | z & ~x) | 0;
                        w = (w >>> 18 | w << 14) + y | 0;
                        x = x + -405537720 + (w & z | y & ~z) | 0;
                        x = (x >>> 12 | x << 20) + w | 0;
                        z = z + 568446438 + (x & y | w & ~y) | 0;
                        z = (z >>> 27 | z << 5) + x | 0;
                        y = y + -1019803562 + (z & w | x & ~w) | 0;
                        y = (y >>> 23 | y << 9) + z | 0;
                        w = b + -187363961 + w + (y & x | z & ~x) | 0;
                        w = (w >>> 18 | w << 14) + y | 0;
                        x = x + 1163531501 + (w & z | y & ~z) | 0;
                        x = (x >>> 12 | x << 20) + w | 0;
                        z = z + -1444681467 + (x & y | w & ~y) | 0;
                        z = (z >>> 27 | z << 5) + x | 0;
                        y = t + y + (z & w | x & ~w) | 0;
                        y = (y >>> 23 | y << 9) + z | 0;
                        w = w + 1735328473 + (y & x | z & ~x) | 0;
                        w = (w >>> 18 | w << 14) + y | 0;
                        x = x + -1926607734 + (w & z | y & ~z) | 0;
                        x = (x >>> 12 | x << 20) + w | 0;
                        z = z + -378558 + (w ^ y ^ x) | 0;
                        z = (z >>> 28 | z << 4) + x | 0;
                        y = y + -2022574463 + (x ^ w ^ z) | 0;
                        y = (y >>> 21 | y << 11) + z | 0;
                        w = w + 1839030562 + (z ^ x ^ y) | 0;
                        w = (w >>> 16 | w << 16) + y | 0;
                        x = x + -35309428 + (y ^ z ^ w) | 0;
                        x = (x >>> 9 | x << 23) + w | 0;
                        z = u + z + (w ^ y ^ x) | 0;
                        z = (z >>> 28 | z << 4) + x | 0;
                        y = y + 1272893481 + (x ^ w ^ z) | 0;
                        y = (y >>> 21 | y << 11) + z | 0;
                        w = w + -155497632 + (z ^ x ^ y) | 0;
                        w = (w >>> 16 | w << 16) + y | 0;
                        x = x + -1094730640 + (y ^ z ^ w) | 0;
                        x = (x >>> 9 | x << 23) + w | 0;
                        z = z + 681279174 + (w ^ y ^ x) | 0;
                        z = (z >>> 28 | z << 4) + x | 0;
                        y = v + y + (x ^ w ^ z) | 0;
                        y = (y >>> 21 | y << 11) + z | 0;
                        w = b + -722521979 + w + (z ^ x ^ y) | 0;
                        w = (w >>> 16 | w << 16) + y | 0;
                        x = x + 76029189 + (y ^ z ^ w) | 0;
                        x = (x >>> 9 | x << 23) + w | 0;
                        z = z + -640364487 + (w ^ y ^ x) | 0;
                        z = (z >>> 28 | z << 4) + x | 0;
                        y = y + -421815835 + (x ^ w ^ z) | 0;
                        y = (y >>> 21 | y << 11) + z | 0;
                        w = w + 530742520 + (z ^ x ^ y) | 0;
                        w = (w >>> 16 | w << 16) + y | 0;
                        x = j + x + (y ^ z ^ w) | 0;
                        x = (x >>> 9 | x << 23) + w | 0;
                        z = i + z + ((x | ~y) ^ w) | 0;
                        z = (z >>> 26 | z << 6) + x | 0;
                        y = y + 1126891415 + ((z | ~w) ^ x) | 0;
                        y = (y >>> 22 | y << 10) + z | 0;
                        w = w + -1416354777 + ((y | ~x) ^ z) | 0;
                        w = (w >>> 17 | w << 15) + y | 0;
                        x = x + -57434055 + ((w | ~z) ^ y) | 0;
                        x = (x >>> 11 | x << 21) + w | 0;
                        z = z + 1700485571 + ((x | ~y) ^ w) | 0;
                        z = (z >>> 26 | z << 6) + x | 0;
                        y = b + -1894986606 + y + ((z | ~w) ^ x) | 0;
                        y = (y >>> 22 | y << 10) + z | 0;
                        w = w + -1051523 + ((y | ~x) ^ z) | 0;
                        w = (w >>> 17 | w << 15) + y | 0;
                        x = h + x + ((w | ~z) ^ y) | 0;
                        x = (x >>> 11 | x << 21) + w | 0;
                        z = z + 1873313359 + ((x | ~y) ^ w) | 0;
                        z = (z >>> 26 | z << 6) + x | 0;
                        y = y + -30611744 + ((z | ~w) ^ x) | 0;
                        y = (y >>> 22 | y << 10) + z | 0;
                        w = w + -1560198380 + ((y | ~x) ^ z) | 0;
                        w = (w >>> 17 | w << 15) + y | 0;
                        x = x + 1309151649 + ((w | ~z) ^ y) | 0;
                        x = (x >>> 11 | x << 21) + w | 0;
                        w = z + -145522942 + ((x | ~y) ^ w) | 0;
                        e = e + 1 | 0;
                        if ((x + 4530945 + (w >>> 26 | w << 6) | -16777216 | 0) == -16777216) {
                            a = 11;
                            break a
                        }
                    } while (e >>> 0 < 126);
                    f = f + 256 | 0
                } while (f >>> 0 < 32256);
                g = g + 65536 | 0
            } while (g >>> 0 < 8257536);
            a = a + 16777216 | 0;
            if (a >>> 0 >= k >>> 0) {
                b = 0;
                a = 11;
                break
            }
        }
        if ((a | 0) == 11)
            return b | 0;
        return 0
    }

    return {
        /**
         * hashcash_md5
         *   @param {uint32} task_begin
         *   @param {uint32} task_end
         *   @param {uint32} x0
         *   @param {uint32} x1
         *   @param {uint32} x2
         *   @return {uint32} result
         */
        hashcash_md5: Ia
    };
})();


var input;
var x0, x1, x2;

function task(beg, end) {
    var ret = ASM.hashcash_md5(beg, end, x0, x1, x2);

    if (ret != 0) {
        postMessage({
            msg: 'found',
            input: input,
            result: dword_to_str4(ret)
        });
    } else {
        postMessage({
            input: input,
            msg: 'done'
        });
    }
}

function dword_to_str4(val) {
    return String.fromCharCode(
        val >>  0 & 0xff,
        val >>  8 & 0xff,
        val >> 16 & 0xff,
        val >> 24 & 0xff
    );
}
function str4_to_dword(str) {
    return (
        str.charCodeAt(0) << 0  |
        str.charCodeAt(1) << 8  |
        str.charCodeAt(2) << 16 |
        str.charCodeAt(3) << 24
    );
}

self.onmessage = function(e) {
    var data = e.data;

    switch (data.msg) {
    case 'init':
        input = data.input;
        x0 = str4_to_dword( input.substr(0, +4) );
        x1 = str4_to_dword( input.substr(4, +4) );
        x2 = str4_to_dword( input.substr(8, +4) );
        postMessage({msg: 'ready'});
        break;

    case 'task':
        task(data.beg, data.end);
        break;
    }
};