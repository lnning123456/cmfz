// [AIV_SHORT]  Build version: 1.0.3 - Monday, November 4th, 2019, 2:44:41 PM  
!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.GoEasy = e() : t.GoEasy = e()
}(this, function () {
    return function (t) {
        function e(o) {
            if (n[o]) return n[o].exports;
            var i = n[o] = {exports: {}, id: o, loaded: !1};
            return t[o].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
        }

        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0)
    }([function (t, e, n) {
        "use strict";
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, i = n(1), r = n(35), s = [], c = !1, a = function (t) {
            if (c) {
                var e = (new Date).formatDate("yy-MM-dd hh:mm:ss.S");
                s.push(e + " " + t + "\n")
            }
        }, u = function () {
            this.currentNumber = this.initialCurrentNumber()
        };
        u.prototype = {
            maxNumber: parseInt("10"), number: function () {
                return this.currentNumber
            }, initialCurrentNumber: function () {
                var t = this;
                return g() || m() ? t.currentNumber || (t.currentNumber = y(1, parseInt("10"))) : t.currentNumber = parseInt(h("goeasyNode")), t.currentNumber > 0 && t.currentNumber < this.maxNumber ? t.currentNumber = t.currentNumber + 1 : t.currentNumber == this.maxNumber ? t.currentNumber = 1 : t.currentNumber = Math.floor(Math.random() * this.maxNumber + 1), g() || m() || l("goeasyNode", t.currentNumber), t.currentNumber
            }
        };
        var p = function (t) {
            var e, n = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
            return (e = document.cookie.match(n)) ? unescape(e[2]) : null
        }, h = function (t) {
            return window.localStorage ? window.localStorage.getItem(t) : p(t)
        }, f = function (t, e) {
            var n = 30, o = new Date;
            o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), document.cookie = t + "=" + escape(e) + ";expires=" + o.toGMTString()
        }, l = function (t, e) {
            window.localStorage ? window.localStorage.setItem(t, e) : f(t, e)
        }, d = function () {
            Array.apply(this)
        }, y = function (t, e) {
            return Math.floor(Math.random() * (t - e) + e)
        }, m = function () {
            return !("undefined" == typeof wx || !wx.getLocation) && ("function" != typeof WebSocket || "function" != typeof XMLHttpRequest)
        }, b = function () {
            return !("object" !== ("undefined" == typeof uni ? "undefined" : o(uni)) || !uni.getSystemInfo)
        }, g = function () {
            return "undefined" != typeof navigator && "ReactNative" == navigator.product
        }, v = new u, k = function (t) {
            if (a("GoEasy() Create GoEasy object:" + JSON.stringify(t)), this._isEmpty(t.appkey)) return void ("undefined" != typeof t.onConnectFailed && t.onConnectFailed({
                code: 400,
                content: "appkey is required"
            }));
            if (this._copyConfig(t), "undefined" == typeof t.host) return void t.onConnectFailed({
                code: 400,
                content: "host is required"
            });
            var e = "://" + v.number() + t.host, n = "";
            m() || g() ? (n = b() ? "https://wx-" + t.host + ":443" : m() ? "https://wx-" + t.host + ":443" : t.forceTLS ? "https" + e + ":443" : "http" + e + ":80", this.socket = i(n, {
                transports: ["websocket"],
                timeout: 1500
            })) : (n = t.forceTLS ? "https" + e + ":443" : "http" + e + ":80", this.socket = i.connect(n, {
                transports: ["polling", "websocket"],
                timeout: 1500
            })), this._callbackEvents(t)
        };
        k.goEasyDomainNumber = v, k.isWx = m, m() ? wx._GoEasy_ = k : window._GoEasy_ = k, Date.prototype.formatDate = function (t) {
            var e = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                S: this.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var n in e) e.hasOwnProperty(n) && new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[n] : ("00" + e[n]).substr(("" + e[n]).length)));
            return t
        }, d.prototype = new Array, d.prototype.indexOfGuid = function (t) {
            for (var e = 0; e < this.length; e++) if (this[e] == t) return e;
            return -1
        }, d.prototype.unshiftGuid = function (t) {
            var e = !1, n = this.indexOfGuid(t);
            for (n > -1 && (e = !0, this.splice(n, 1)), this.unshift(t); this.length > 300;) this.pop();
            return e
        }, k.prototype = {
            debug: !1,
            socket: null,
            authorizeResult: null,
            channels: [],
            networkStatus: "initial",
            subscribeBuffer: [],
            maxRetries: 3,
            _manualConnect: !1,
            _manualDisconnectStatus: "initial",
            authorizeStatus: "initial",
            receivedGuids: new d,
            _copyConfig: function (t) {
                this._appkey = t.appkey, this._otp = t.otp, this._isEmpty(t.userId) ? (this._userId = "anonymous-" + Math.floor(1e5 * Math.random() + 1), t.userId = this._userId) : this._userId = this._trim(t.userId), this._isEmpty(t.userData) ? this._userData = "" : this._userData = this._trim(t.userData), 1 == t.debug && (this.debug = !0)
            },
            subscribe: function (t) {
                if (a("subscribe() subscribe:" + JSON.stringify(t)), this._isEmpty(t.channel)) return a("subscribe() 'channel' is required."), void ("undefined" != typeof t.onFailed && t.onFailed({
                    code: 400,
                    content: "channel is required"
                }));
                this.subscribeBuffer[t.channel] = t, a("subscribe() add subscription into subscribeBuffer:" + JSON.stringify(this.subscribeBuffer[t.channel]));
                var e = this;
                null != e.authorizeResult && "connected" == e.networkStatus && (t.checking = !0, e.doSubscribeAndCheckAck(t))
            },
            doSubscribe: function (t) {
                a("doSubscribe() with subscription:" + JSON.stringify(t));
                var e = this;
                if (200 == e.authorizeResult.code) if (this._isEmpty(t.channel)) a("doSubscribe() subscribe failed with empty channel"), e.sendlogs(), t.finish = !0; else {
                    var n = {channel: t.channel, sid: e.authorizeResult.sid};
                    a("doSubscribe() emit subscribe params:" + JSON.stringify(n)), e.socket.emit("subscribe", n, function (n) {
                        a("doSubscribe() receive subscribe ack:" + JSON.stringify(n)), 1 != t.finish && (t.finish = !0, delete e.subscribeBuffer[t.channel], a("doSubscribe() delete subscription from subscribeBuffer:" + JSON.stringify(t)), 200 == n.resultCode ? (e.channels[t.channel] = t, "undefined" != typeof t.onSuccess && t.onSuccess()) : "undefined" != typeof t.onFailed && t.onFailed({
                            code: n.resultCode,
                            content: n.content
                        }))
                    })
                } else a("doSubscribe() return with authorize code:" + e.authorizeResult.code)
            },
            doSubscribeAndCheckAck: function (t) {
                a("doSubscribeAndCheckAck():" + JSON.stringify(t)), t.finish = !1;
                var e = this;
                e.doSubscribe(t);
                var n = setInterval(function () {
                    t.finish || "connected" != e.networkStatus ? (a("doSubscribeAndCheckAck() clean doSubscribeAndCheckAck:" + JSON.stringify(t)), t.checking = !1, clearInterval(n)) : (a("doSubscribeAndCheckAck() retry doSubscribe:" + JSON.stringify(t)), e.doSubscribe(t))
                }, 1300)
            },
            subscribePresence: function (t) {
                return this._isEmpty(t.channel) ? void ("undefined" != typeof t.onFailed && t.onFailed({
                    code: 400,
                    content: "channel is required"
                })) : (t.channel = t.channel + "_presence", void this.subscribe(t))
            },
            unsubscribe: function (t) {
                function e() {
                    200 == o.authorizeResult.code ? o.socket.emit("unsubscribe", {
                        sid: o.authorizeResult.sid,
                        channel: t.channel
                    }, function (e) {
                        i = !0, 200 == e.resultCode ? (delete o.channels[t.channel], a("doUnsubscribe() delete from channels:" + JSON.stringify(t)), "undefined" != typeof t.onSuccess && t.onSuccess()) : "undefined" != typeof t.onFailed && t.onFailed({
                            code: e.resultCode,
                            content: e.content
                        })
                    }) : (i = !0, "undefined" != typeof t.onFailed && t.onFailed({
                        code: o.authorizeResult.code,
                        content: o.authorizeResult.content
                    }))
                }

                function n() {
                    e();
                    var n = setInterval(function () {
                        !i && "connected" == o.networkStatus && r < 0 ? (r++, e()) : r == o.maxRetries ? (clearInterval(n), "undefined" != typeof t.onFailed && t.onFailed({
                            code: 408,
                            content: "Server unreachable or timeout"
                        })) : clearInterval(n)
                    }, 1e3)
                }

                if (this._isEmpty(t.channel)) return this.log("'channel' is required."), void ("undefined" != typeof t.onFailed && t.onFailed({
                    code: 400,
                    content: "channel is required"
                }));
                if ("undefined" == typeof this.channels[t.channel]) return this.log("'channel' is not subscribed."), void ("undefined" != typeof t.onFailed && t.onFailed({
                    code: 400,
                    content: "channel[" + t.channel + "] is not subscribed"
                }));
                var o = this, i = !1, r = 0;
                if (null != this.authorizeResult && "connected" == o.networkStatus) n(); else var s = setInterval(function () {
                    null != o.authorizeResult && "connected" == o.networkStatus ? (clearInterval(s), n()) : (r++, r == o.maxRetries && (clearInterval(s), "undefined" != typeof t.onFailed && t.onFailed({
                        code: 408,
                        content: "Server unreachable or timeout"
                    })))
                }, 1e3)
            },
            unsubscribePresence: function (t) {
                return this._isEmpty(t.channel) ? void ("undefined" != typeof t.onFailed && t.onFailed({
                    code: 400,
                    content: "channel is required"
                })) : (t.channel = t.channel + "_presence", void this.unsubscribe(t))
            },
            publish: function (t) {
                function e(e) {
                    200 == o.authorizeResult.code ? o.socket.emit("publish", {
                        sid: o.authorizeResult.sid,
                        channel: t.channel,
                        content: t.message,
                        guid: e,
                        retried: r
                    }, function (e) {
                        i = !0, 200 == e.resultCode ? "undefined" != typeof t.onSuccess && t.onSuccess() : "undefined" != typeof t.onFailed && t.onFailed({
                            code: e.resultCode,
                            content: e.content
                        })
                    }) : (i = !0, "undefined" != typeof t.onFailed && t.onFailed({
                        code: o.authorizeResult.code,
                        content: o.authorizeResult.content
                    }))
                }

                function n() {
                    var n = o.uuid_goeasy();
                    e(n);
                    var s = setInterval(function () {
                        !i && r < o.maxRetries ? (r++, e(n)) : r == o.maxRetries ? (clearInterval(s), "undefined" != typeof t.onFailed && t.onFailed({
                            code: 408,
                            content: "Server unreachable or timeout"
                        })) : clearInterval(s)
                    }, 1e3)
                }

                if (this._isEmpty(t.channel)) return this.log("'channel' is required."), void ("undefined" != typeof t.onFailed && t.onFailed({
                    code: 400,
                    content: "channel is required"
                }));
                if (this._isEmpty(t.message)) return this.log("'message' is required."), void ("undefined" != typeof t.onFailed && t.onFailed({
                    code: 400,
                    content: "message is required"
                }));
                var o = this, i = !1, r = 0;
                if (null != this.authorizeResult && "connected" == o.networkStatus) n(); else var s = setInterval(function () {
                    null != o.authorizeResult && "connected" == o.networkStatus ? (clearInterval(s), n()) : (r++, r == o.maxRetries && (clearInterval(s), "undefined" != typeof t.onFailed && t.onFailed({
                        code: 408,
                        content: "Server unreachable or timeout"
                    })))
                }, 1e3)
            },
            hereNow: function (t, e) {
                var n = {channels: [], includeUsers: !1, distinct: !1};
                "undefined" !== t.channels && (n.channels = t.channels), 1 == t.includeUsers && (n.includeUsers = !0), 1 == t.distinct && (n.distinct = !0), this.socket.emit("hereNow", n, function (t) {
                    "undefined" != typeof e && e(t)
                })
            },
            history: function (t, e) {
                return this._isEmpty(t.channel) ? void ("undefined" != typeof e && e({
                    code: 400,
                    content: "channel is required"
                })) : void this.socket.emit("historyMessages", t, function (t) {
                    "undefined" != typeof e && e(t)
                })
            },
            disconnect: function () {
                var t = this;
                if (this._manualDisconnectStatus = "disconnecting", "connected" === this.networkStatus && "authorized" === this.authorizeStatus && 200 === this.authorizeResult.code) {
                    var e = function () {
                        t.socket.disconnect()
                    }, n = function () {
                        t._manualDisconnectStatus = "disconnected"
                    };
                    t.tryEmit("manualDisconnect", null, e, n)
                } else this.socket.disconnect()
            },
            reconnect: function () {
                this._manualConnect = !0, this.socket.connect()
            },
            tryEmit: function (t, e, n, o) {
                function i() {
                    r.socket.emit(t, e, function (t) {
                        s = !0, "undefined" != typeof o && o(t)
                    })
                }

                var r = this, s = !1, c = 0;
                i();
                var a = setInterval(function () {
                    var t = c === r.maxRetries;
                    s || t ? (clearInterval(a), t && "undefined" != typeof n && n()) : (c++, i())
                }, 1e3)
            },
            _callbackEvents: function (t) {
                var e = this;
                this.socket.on("message", function (t, n) {
                    var o = JSON.parse(t);
                    e.receivedGuids.unshiftGuid(o.i) || (o.a && e.socket.emit("ack", {publishGuid: o.i}), e._endWith(o.n, "presence") ? "undefined" != typeof e.channels[o.n].onPresence && e.channels[o.n].onPresence(JSON.parse(o.c)) : "undefined" != typeof e.channels[o.n].onMessage && e.channels[o.n].onMessage({
                        time: o.t,
                        channel: o.n,
                        content: o.c
                    }))
                }), this.socket.on("connect", function () {
                    function n() {
                        a("doAuthorize() emit authorize params:" + JSON.stringify(o)), e._isEmpty(o.artifactVersion) && e.sendlogs(), e.socket.emit("authorize", o, function (n) {
                            if (a("doAuthorize() received authorize ack:" + JSON.stringify(n)), !i) if (i = !0, e.authorizeStatus = "authorized", e._manualDisconnectStatus = "initial", null == e.authorizeResult && (e.authorizeResult = {}), e.authorizeResult.code = n.resultCode, e.authorizeResult.content = n.content, 200 == n.resultCode) {
                                if (null == e.authorizeResult.sid) e.authorizeResult.sid = n.sid; else if (e.authorizeResult.sid != n.sid) {
                                    e.authorizeResult.sid = n.sid;
                                    for (var o in e.channels) e.channels.hasOwnProperty(o) && (a("doAuthorize() sid expired and will call doSubscribeAndCheckAck from channels:" + JSON.stringify(e.channels[o])), e.doSubscribeAndCheckAck(e.channels[o]))
                                }
                                for (var r in e.subscribeBuffer) e.subscribeBuffer.hasOwnProperty(r) && (a("doAuthorize() will doSubscribeAndCheckAck from subscribeBuffer:" + JSON.stringify(e.subscribeBuffer[r])), e.doSubscribeAndCheckAck(e.subscribeBuffer[r]));
                                "undefined" != typeof t.onConnected && t.onConnected()
                            } else "undefined" != typeof t.onConnectFailed && t.onConnectFailed({
                                code: n.resultCode,
                                content: n.content
                            })
                        })
                    }

                    if ("disconnecting" !== e._manualDisconnectStatus && "disconnected" !== e._manualDisconnectStatus || e._manualConnect) {
                        e.authorizeStatus = "authorizing", e.networkStatus = "connected";
                        var o = {
                            appkey: e._appkey,
                            userId: e._userId,
                            userData: e._userData,
                            otp: e._otp,
                            artifactVersion: "1.0.3",
                            manual: e._manualConnect
                        };
                        null != e.authorizeResult && (o.sid = e.authorizeResult.sid);
                        var i = !1;
                        n();
                        var r = setInterval(function () {
                            i || "connected" != e.networkStatus ? clearInterval(r) : n()
                        }, 1300)
                    }
                }), this.socket.on("connect_error", function (e) {
                    "undefined" != typeof t.onConnectFailed && t.onConnectFailed({code: 408, content: e})
                }), this.socket.on("disconnect", function () {
                    e.networkStatus = "disconnected", e.authorizeStatus = "initial", e._manualConnect = !1, null == e.authorizeResult && (e.authorizeResult = {}), e.authorizeResult.code = 408, e.authorizeResult.content = "Server unreachable or timeout", "undefined" != typeof t.onDisconnected && t.onDisconnected()
                })
            },
            _isEmpty: function (t) {
                return "undefined" == typeof t || null == t || 0 == this._trim(t).length
            },
            _trim: function (t) {
                return t.replace(/(^\s*)|(\s*$)/g, "")
            },
            _endWith: function (t, e) {
                var n = new RegExp(e + "$");
                return n.test(t)
            },
            log: function (t) {
                window.console && this.debug && console.log(t)
            },
            uuid_goeasy: function () {
                return r()
            },
            sendlogs: function () {
                c && this.socket.emit("log", {logs: s})
            }
        };
        var S = function () {
            var t;
            return function (e) {
                return t || (t = new k(e)), t
            }
        }();
        t.exports = S
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            "object" === ("undefined" == typeof t ? "undefined" : i(t)) && (e = t, t = void 0), e = e || {};
            var n, o = r(t), s = o.source, u = o.id, p = o.path, h = a[u] && p in a[u].nsps,
                f = e.forceNew || e["force new connection"] || !1 === e.multiplex || h;
            return f ? n = c(s, e) : (a[u] || (a[u] = c(s, e)), n = a[u]), o.query && !e.query && (e.query = o.query), n.socket(o.path, e)
        }

        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, r = n(2), s = n(5), c = n(8);
        n(4)("socket.io-client");
        t.exports = e = o;
        var a = e.managers = {};
        e.protocol = s.protocol, e.connect = o, e.Manager = n(8), e.Socket = n(30)
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            var n = t;
            e = e || "undefined" != typeof location && location, null == t && (t = e.protocol + "//" + e.host), "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t), /^(https?|wss?):\/\//.test(t) || (t = "undefined" != typeof e ? e.protocol + "//" + t : "https://" + t), n = i(t)), n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")), n.path = n.path || "/";
            var o = n.host.indexOf(":") !== -1, r = o ? "[" + n.host + "]" : n.host;
            return n.id = n.protocol + "://" + r + ":" + n.port, n.href = n.protocol + "://" + r + (e && e.port === n.port ? "" : ":" + n.port), n
        }

        var i = n(3);
        n(4)("socket.io-client:url");
        t.exports = o
    }, function (t, e) {
        var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        t.exports = function (t) {
            var e = t, i = t.indexOf("["), r = t.indexOf("]");
            i != -1 && r != -1 && (t = t.substring(0, i) + t.substring(i, r).replace(/:/g, ";") + t.substring(r, t.length));
            for (var s = n.exec(t || ""), c = {}, a = 14; a--;) c[o[a]] = s[a] || "";
            return i != -1 && r != -1 && (c.source = e, c.host = c.host.substring(1, c.host.length - 1).replace(/;/g, ":"), c.authority = c.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), c.ipv6uri = !0), c
        }
    }, function (t, e) {
        "use strict";
        t.exports = function () {
            return function () {
            }
        }
    }, function (t, e, n) {
        "use strict";

        function o() {
        }

        function i(t) {
            var n = "" + t.type;
            if (e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (n += t.attachments + "-"), t.nsp && "/" !== t.nsp && (n += t.nsp + ","), null != t.id && (n += t.id), null != t.data) {
                var o = r(t.data);
                if (o === !1) return l;
                n += o
            }
            return n
        }

        function r(t) {
            try {
                return JSON.stringify(t)
            } catch (t) {
                return !1
            }
        }

        function s() {
            this.reconstructor = null
        }

        function c(t) {
            var n = 0, o = {type: Number(t.charAt(0))};
            if (null == e.types[o.type]) return p("unknown packet type " + o.type);
            if (e.BINARY_EVENT === o.type || e.BINARY_ACK === o.type) {
                for (var i = ""; "-" !== t.charAt(++n) && (i += t.charAt(n), n != t.length);) ;
                if (i != Number(i) || "-" !== t.charAt(n)) throw new Error("Illegal attachments");
                o.attachments = Number(i)
            }
            if ("/" === t.charAt(n + 1)) for (o.nsp = ""; ++n;) {
                var r = t.charAt(n);
                if ("," === r) break;
                if (o.nsp += r, n === t.length) break
            } else o.nsp = "/";
            var s = t.charAt(n + 1);
            if ("" !== s && Number(s) == s) {
                for (o.id = ""; ++n;) {
                    var r = t.charAt(n);
                    if (null == r || Number(r) != r) {
                        --n;
                        break
                    }
                    if (o.id += t.charAt(n), n === t.length) break
                }
                o.id = Number(o.id)
            }
            if (t.charAt(++n)) {
                var c = a(t.substr(n)), u = c !== !1 && (o.type === e.ERROR || f(c));
                if (!u) return p("invalid payload");
                o.data = c
            }
            return o
        }

        function a(t) {
            try {
                return JSON.parse(t)
            } catch (t) {
                return !1
            }
        }

        function u(t) {
            this.reconPack = t, this.buffers = []
        }

        function p(t) {
            return {type: e.ERROR, data: "parser error: " + t}
        }

        var h = (n(4)("socket.io-parser"), n(6)), f = n(7);
        e.protocol = 4, e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], e.CONNECT = 0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, e.BINARY_ACK = 6, e.Encoder = o, e.Decoder = s;
        var l = e.ERROR + '"encode error"';
        o.prototype.encode = function (t, e) {
            var n = i(t);
            e([n])
        }, h(s.prototype), s.prototype.add = function (t) {
            var e;
            if ("string" != typeof t) throw new Error("Unknown type: " + t);
            e = c(t), this.emit("decoded", e)
        }, s.prototype.destroy = function () {
            this.reconstructor && this.reconstructor.finishedReconstruction()
        }, u.prototype.takeBinaryData = function (t) {
            if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
                var e = binary.reconstructPacket(this.reconPack, this.buffers);
                return this.finishedReconstruction(), e
            }
            return null
        }, u.prototype.finishedReconstruction = function () {
            this.reconPack = null, this.buffers = []
        }
    }, function (t, e, n) {
        function o(t) {
            if (t) return i(t)
        }

        function i(t) {
            for (var e in o.prototype) t[e] = o.prototype[e];
            return t
        }

        t.exports = o, o.prototype.on = o.prototype.addEventListener = function (t, e) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
        }, o.prototype.once = function (t, e) {
            function n() {
                this.off(t, n), e.apply(this, arguments)
            }

            return n.fn = e, this.on(t, n), this
        }, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function (t, e) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
            var n = this._callbacks["$" + t];
            if (!n) return this;
            if (1 == arguments.length) return delete this._callbacks["$" + t], this;
            for (var o, i = 0; i < n.length; i++) if (o = n[i], o === e || o.fn === e) {
                n.splice(i, 1);
                break
            }
            return this
        }, o.prototype.emit = function (t) {
            this._callbacks = this._callbacks || {};
            var e = [].slice.call(arguments, 1), n = this._callbacks["$" + t];
            if (n) {
                n = n.slice(0);
                for (var o = 0, i = n.length; o < i; ++o) n[o].apply(this, e)
            }
            return this
        }, o.prototype.listeners = function (t) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
        }, o.prototype.hasListeners = function (t) {
            return !!this.listeners(t).length
        }
    }, function (t, e) {
        var n = {}.toString;
        t.exports = Array.isArray || function (t) {
            return "[object Array]" == n.call(t)
        }
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(this instanceof o)) return new o(t, e);
            t && "object" === ("undefined" == typeof t ? "undefined" : i(t)) && (e = t, t = void 0), e = e || {}, e.path = e.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(e.reconnection !== !1), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new f({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", this.uri = t, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
            var n = e.parser || a;
            this.encoder = new n.Encoder, this.decoder = new n.Decoder, this.autoConnect = e.autoConnect !== !1, this.autoConnect && this.open()
        }

        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, r = n(9), s = n(30), c = n(6), a = n(5), u = n(32), p = n(33), h = (n(4)("socket.io-client:manager"), n(29)),
            f = n(34), l = Object.prototype.hasOwnProperty;
        t.exports = o, o.prototype.emitAll = function () {
            this.emit.apply(this, arguments);
            for (var t in this.nsps) l.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments)
        }, o.prototype.updateSocketIds = function () {
            for (var t in this.nsps) l.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t))
        }, o.prototype.generateId = function (t) {
            return ("/" === t ? "" : t + "#") + this.engine.id
        }, c(o.prototype), o.prototype.reconnection = function (t) {
            return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
        }, o.prototype.reconnectionAttempts = function (t) {
            return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts
        }, o.prototype.reconnectionDelay = function (t) {
            return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay
        }, o.prototype.randomizationFactor = function (t) {
            return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor
        }, o.prototype.reconnectionDelayMax = function (t) {
            return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax
        }, o.prototype.timeout = function (t) {
            return arguments.length ? (this._timeout = t, this) : this._timeout
        }, o.prototype.maybeReconnectOnOpen = function () {
            !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
        }, o.prototype.open = o.prototype.connect = function (t, e) {
            if (~this.readyState.indexOf("open")) return this;
            this.engine = r(this.uri, this.opts);
            var n = this.engine, o = this;
            this.readyState = "opening", this.skipReconnect = !1;
            var i = u(n, "open", function () {
                o.onopen(), t && t()
            }), s = window, c = u(n, "error", function (e) {
                if (s) {
                    var n = /[1-9][0-9]*/g, i = parseInt(o.uri.match(n)[0]),
                        r = s._GoEasy_.goEasyDomainNumber.initialCurrentNumber();
                    o.uri = o.uri.replace(i, r)
                }
                if (o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", e), t) {
                    var c = new Error("Connection error");
                    c.data = e, t(c)
                } else o.maybeReconnectOnOpen()
            });
            if (!1 !== this._timeout) {
                var a = this._timeout, p = setTimeout(function () {
                    i.destroy(), n.close(), n.emit("error", "timeout"), o.emitAll("connect_timeout", a)
                }, a);
                this.subs.push({
                    destroy: function () {
                        clearTimeout(p)
                    }
                })
            }
            return this.subs.push(i), this.subs.push(c), this
        }, o.prototype.onopen = function () {
            this.cleanup(), this.readyState = "open", this.emit("open");
            var t = this.engine;
            this.subs.push(u(t, "data", p(this, "ondata"))), this.subs.push(u(t, "ping", p(this, "onping"))), this.subs.push(u(t, "pong", p(this, "onpong"))), this.subs.push(u(t, "error", p(this, "onerror"))), this.subs.push(u(t, "close", p(this, "onclose"))), this.subs.push(u(this.decoder, "decoded", p(this, "ondecoded")))
        }, o.prototype.onping = function () {
            this.lastPing = new Date, this.emitAll("ping")
        }, o.prototype.onpong = function () {
            this.emitAll("pong", new Date - this.lastPing)
        }, o.prototype.ondata = function (t) {
            this.decoder.add(t)
        }, o.prototype.ondecoded = function (t) {
            this.emit("packet", t)
        }, o.prototype.onerror = function (t) {
            this.emitAll("error", t)
        }, o.prototype.socket = function (t, e) {
            function n() {
                ~h(i.connecting, o) || i.connecting.push(o)
            }

            var o = this.nsps[t];
            if (!o) {
                o = new s(this, t, e), this.nsps[t] = o;
                var i = this;
                o.on("connecting", n), o.on("connect", function () {
                    o.id = i.generateId(t)
                }), this.autoConnect && n()
            }
            return o
        }, o.prototype.destroy = function (t) {
            var e = h(this.connecting, t);
            ~e && this.connecting.splice(e, 1), this.connecting.length || this.close()
        }, o.prototype.packet = function (t) {
            var e = this;
            t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, this.encoder.encode(t, function (n) {
                for (var o = 0; o < n.length; o++) e.engine.write(n[o], t.options);
                e.encoding = !1, e.processPacketQueue()
            }))
        }, o.prototype.processPacketQueue = function () {
            if (this.packetBuffer.length > 0 && !this.encoding) {
                var t = this.packetBuffer.shift();
                this.packet(t)
            }
        }, o.prototype.cleanup = function () {
            for (var t = this.subs.length, e = 0; e < t; e++) {
                var n = this.subs.shift();
                n.destroy()
            }
            this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
        }, o.prototype.close = o.prototype.disconnect = function () {
            this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
        }, o.prototype.onclose = function (t) {
            this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect()
        }, o.prototype.reconnect = function () {
            if (this.reconnecting || this.skipReconnect) return this;
            var t = this;
            if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
                var e = this.backoff.duration();
                this.reconnecting = !0;
                var n = setTimeout(function () {
                    t.skipReconnect || (t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function (e) {
                        e ? (t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : t.onreconnect()
                    }))
                }, e);
                this.subs.push({
                    destroy: function () {
                        clearTimeout(n)
                    }
                })
            }
        }, o.prototype.onreconnect = function () {
            var t = this.backoff.attempts;
            this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t)
        }
    }, function (t, e, n) {
        "use strict";
        t.exports = n(10), t.exports.parser = n(15)
    }, function (t, e, n) {
        "use strict";

        function o(t, e) {
            return this instanceof o ? (e = e || {}, t && "object" === ("undefined" == typeof t ? "undefined" : r(t)) && (e = t, t = null), t ? (t = p(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = p(e.host).host), this.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol, e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.agent = e.agent || !1, this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), this.query = e.query || {}, "string" == typeof this.query && (this.query = h.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["polling", "websocket"], this.transportOptions = e.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized, this.forceNode = !!e.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), ("undefined" == typeof self || this.isReactNative) && (e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders), e.localAddress && (this.localAddress = e.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, void this.open()) : new o(t, e)
        }

        function i(t) {
            var e = {};
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        }

        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, s = n(11), c = n(6), a = (n(4)("engine.io-client:socket"), n(29)), u = n(15), p = n(3), h = n(22);
        t.exports = o, o.priorWebsocketSuccess = !1, c(o.prototype), o.protocol = u.protocol, o.Socket = o, o.Transport = n(14), o.transports = n(11), o.parser = n(15), o.prototype.createTransport = function (t) {
            var e = i(this.query);
            e.EIO = u.protocol, e.transport = t;
            var n = this.transportOptions[t] || {};
            this.id && (e.sid = this.id);
            var o = new s[t]({
                query: e,
                socket: this,
                agent: n.agent || this.agent,
                hostname: n.hostname || this.hostname,
                port: n.port || this.port,
                secure: n.secure || this.secure,
                path: n.path || this.path,
                forceJSONP: n.forceJSONP || this.forceJSONP,
                jsonp: n.jsonp || this.jsonp,
                forceBase64: n.forceBase64 || this.forceBase64,
                enablesXDR: n.enablesXDR || this.enablesXDR,
                timestampRequests: n.timestampRequests || this.timestampRequests,
                timestampParam: n.timestampParam || this.timestampParam,
                policyPort: n.policyPort || this.policyPort,
                pfx: n.pfx || this.pfx,
                key: n.key || this.key,
                passphrase: n.passphrase || this.passphrase,
                cert: n.cert || this.cert,
                ca: n.ca || this.ca,
                ciphers: n.ciphers || this.ciphers,
                rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: n.extraHeaders || this.extraHeaders,
                forceNode: n.forceNode || this.forceNode,
                localAddress: n.localAddress || this.localAddress,
                requestTimeout: n.requestTimeout || this.requestTimeout,
                protocols: n.protocols || void 0,
                isReactNative: this.isReactNative
            });
            return o
        }, o.prototype.open = function () {
            var t;
            if (this.rememberUpgrade && o.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) t = "websocket"; else {
                if (0 === this.transports.length) {
                    var e = this;
                    return void setTimeout(function () {
                        e.emit("error", "No transports available")
                    }, 0)
                }
                t = this.transports[0]
            }
            this.readyState = "opening";
            try {
                t = this.createTransport(t)
            } catch (t) {
                return this.transports.shift(), void this.open()
            }
            t.open(), this.setTransport(t)
        }, o.prototype.setTransport = function (t) {
            var e = this;
            this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", function () {
                e.onDrain()
            }).on("packet", function (t) {
                e.onPacket(t)
            }).on("error", function (t) {
                e.onError(t)
            }).on("close", function () {
                e.onClose("transport close")
            })
        }, o.prototype.probe = function (t) {
            function e() {
                if (h.onlyBinaryUpgrades) {
                    var t = !this.supportsBinary && h.transport.supportsBinary;
                    p = p || t
                }
                p || (u.send([{type: "ping", data: "probe"}]), u.once("packet", function (t) {
                    if (!p) if ("pong" === t.type && "probe" === t.data) {
                        if (h.upgrading = !0, h.emit("upgrading", u), !u) return;
                        o.priorWebsocketSuccess = "websocket" === u.name, h.transport.pause(function () {
                            p || "closed" !== h.readyState && (a(), h.setTransport(u), u.send([{type: "upgrade"}]), h.emit("upgrade", u), u = null, h.upgrading = !1, h.flush())
                        })
                    } else {
                        var e = new Error("probe error");
                        e.transport = u.name, h.emit("upgradeError", e)
                    }
                }))
            }

            function n() {
                p || (p = !0, a(), u.close(), u = null)
            }

            function i(t) {
                var e = new Error("probe error: " + t);
                e.transport = u.name, n(), h.emit("upgradeError", e)
            }

            function r() {
                i("transport closed")
            }

            function s() {
                i("socket closed")
            }

            function c(t) {
                u && t.name !== u.name && n()
            }

            function a() {
                u.removeListener("open", e), u.removeListener("error", i), u.removeListener("close", r), h.removeListener("close", s), h.removeListener("upgrading", c)
            }

            var u = this.createTransport(t, {probe: 1}), p = !1, h = this;
            o.priorWebsocketSuccess = !1, u.once("open", e), u.once("error", i), u.once("close", r), this.once("close", s), this.once("upgrading", c), u.open()
        }, o.prototype.onOpen = function () {
            if (this.readyState = "open", o.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
        }, o.prototype.onPacket = function (t) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (this.emit("packet", t), this.emit("heartbeat"), t.type) {
                case"open":
                    this.onHandshake(JSON.parse(t.data));
                    break;
                case"pong":
                    this.setPing(), this.emit("pong");
                    break;
                case"error":
                    var e = new Error("server error");
                    e.code = t.data, this.onError(e);
                    break;
                case"message":
                    this.emit("data", t.data), this.emit("message", t.data)
            }
        }, o.prototype.onHandshake = function (t) {
            this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout,
                this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
        }, o.prototype.onHeartbeat = function (t) {
            clearTimeout(this.pingTimeoutTimer);
            var e = this;
            e.pingTimeoutTimer = setTimeout(function () {
                "closed" !== e.readyState && e.onClose("ping timeout")
            }, t || e.pingInterval + e.pingTimeout)
        }, o.prototype.setPing = function () {
            var t = this;
            clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function () {
                t.ping(), t.onHeartbeat(t.pingTimeout)
            }, t.pingInterval)
        }, o.prototype.ping = function () {
            var t = this;
            this.sendPacket("ping", function () {
                t.emit("ping")
            })
        }, o.prototype.onDrain = function () {
            this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
        }, o.prototype.flush = function () {
            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
        }, o.prototype.write = o.prototype.send = function (t, e, n) {
            return this.sendPacket("message", t, e, n), this
        }, o.prototype.sendPacket = function (t, e, n, o) {
            if ("function" == typeof e && (o = e, e = void 0), "function" == typeof n && (o = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                n = n || {}, n.compress = !1 !== n.compress;
                var i = {type: t, data: e, options: n};
                this.emit("packetCreate", i), this.writeBuffer.push(i), o && this.once("flush", o), this.flush()
            }
        }, o.prototype.close = function () {
            function t() {
                o.onClose("forced close"), o.transport.close()
            }

            function e() {
                o.removeListener("upgrade", e), o.removeListener("upgradeError", e), t()
            }

            function n() {
                o.once("upgrade", e), o.once("upgradeError", e)
            }

            if ("opening" === this.readyState || "open" === this.readyState) {
                this.readyState = "closing";
                var o = this;
                this.writeBuffer.length ? this.once("drain", function () {
                    this.upgrading ? n() : t()
                }) : this.upgrading ? n() : t()
            }
            return this
        }, o.prototype.onError = function (t) {
            o.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
        }, o.prototype.onClose = function (t, e) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                var n = this;
                clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), n.writeBuffer = [], n.prevBufferLen = 0
            }
        }, o.prototype.filterUpgrades = function (t) {
            for (var e = [], n = 0, o = t.length; n < o; n++) ~a(this.transports, t[n]) && e.push(t[n]);
            return e
        }
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            var e = !1, n = !1;
            !1 !== t.jsonp;
            if ("undefined" != typeof location) {
                var o = "https:" === location.protocol, r = location.port;
                r || (r = o ? 443 : 80), e = t.hostname !== location.hostname || r !== t.port, n = t.secure !== o
            }
            return t.xdomain = e, t.xscheme = n, new i(t)
        }

        var i = n(12), r = n(27);
        e.polling = o, e.websocket = r
    }, function (t, e, n) {
        (function (e) {
            "use strict";

            function o() {
            }

            function i() {
                return "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof e ? e : {}
            }

            function r(t) {
                if (s.call(this, t), this.query = this.query || {}, !a) {
                    var e = i();
                    a = e.___eio = e.___eio || []
                }
                this.index = a.length;
                var n = this;
                a.push(function (t) {
                    n.onData(t)
                }), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", function () {
                    n.script && (n.script.onerror = o)
                }, !1)
            }

            var s = n(13), c = n(23);
            t.exports = r;
            var a, u = /\n/g, p = /\\n/g;
            c(r, s), r.prototype.supportsBinary = !1, r.prototype.doClose = function () {
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), s.prototype.doClose.call(this)
            }, r.prototype.doPoll = function () {
                var t = this, e = document.createElement("script");
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src = this.uri(), e.onerror = function (e) {
                    t.onError("jsonp poll error", e)
                };
                var n = document.getElementsByTagName("script")[0];
                n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e), this.script = e;
                var o = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                o && setTimeout(function () {
                    var t = document.createElement("iframe");
                    document.body.appendChild(t), document.body.removeChild(t)
                }, 100)
            }, r.prototype.doWrite = function (t, e) {
                function n() {
                    o(), e()
                }

                function o() {
                    if (i.iframe) try {
                        i.form.removeChild(i.iframe)
                    } catch (t) {
                        i.onError("jsonp polling iframe removal error", t)
                    }
                    try {
                        var t = '<iframe src="javascript:0" name="' + i.iframeId + '">';
                        r = document.createElement(t)
                    } catch (t) {
                        r = document.createElement("iframe"), r.name = i.iframeId, r.src = "javascript:0"
                    }
                    r.id = i.iframeId, i.form.appendChild(r), i.iframe = r
                }

                var i = this;
                if (!this.form) {
                    var r, s = document.createElement("form"), c = document.createElement("textarea"),
                        a = this.iframeId = "eio_iframe_" + this.index;
                    s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", s.style.left = "-1000px", s.target = a, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), c.name = "d", s.appendChild(c), document.body.appendChild(s), this.form = s, this.area = c
                }
                this.form.action = this.uri(), o(), t = t.replace(p, "\\\n"), this.area.value = t.replace(u, "\\n");
                try {
                    this.form.submit()
                } catch (t) {
                }
                this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                    "complete" === i.iframe.readyState && n()
                } : this.iframe.onload = n
            }
        }).call(e, function () {
            return this
        }())
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            var e = t && t.forceBase64;
            u && !e || (this.supportsBinary = !1), i.call(this, t)
        }

        var i = n(14), r = n(22), s = n(15), c = n(23), a = n(24);
        n(4)("engine.io-client:polling");
        t.exports = o;
        var u = function () {
            var t = n(25), e = new t({xdomain: !1});
            return null != e.responseType
        }();
        c(o, i), o.prototype.name = "polling", o.prototype.doOpen = function () {
            this.poll()
        }, o.prototype.pause = function (t) {
            function e() {
                n.readyState = "paused", t()
            }

            var n = this;
            if (this.readyState = "pausing", this.polling || !this.writable) {
                var o = 0;
                this.polling && (o++, this.once("pollComplete", function () {
                    --o || e()
                })), this.writable || (o++, this.once("drain", function () {
                    --o || e()
                }))
            } else e()
        }, o.prototype.poll = function () {
            this.polling = !0, this.doPoll(), this.emit("poll")
        }, o.prototype.onData = function (t) {
            var e = this, n = function (t, n, o) {
                return "opening" === e.readyState && e.onOpen(), "close" === t.type ? (e.onClose(), !1) : void e.onPacket(t)
            };
            s.decodePayload(t, this.socket.binaryType, n), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState && this.poll())
        }, o.prototype.doClose = function () {
            function t() {
                e.write([{type: "close"}])
            }

            var e = this;
            "open" === this.readyState ? t() : this.once("open", t)
        }, o.prototype.write = function (t) {
            var e = this;
            this.writable = !1;
            var n = function () {
                e.writable = !0, e.emit("drain")
            };
            s.encodePayload(t, this.supportsBinary, function (t) {
                e.doWrite(t, n)
            })
        }, o.prototype.uri = function () {
            var t = this.query || {}, e = this.secure ? "https" : "http", n = "";
            !1 !== this.timestampRequests && (t[this.timestampParam] = a()), this.supportsBinary || t.sid || (t.b64 = 1), t = r.encode(t), this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !== Number(this.port)) && (n = ":" + this.port), t.length && (t = "?" + t);
            var o = this.hostname.indexOf(":") !== -1;
            return e + "://" + (o ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
        }
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.forceNode = t.forceNode, this.isReactNative = t.isReactNative, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress
        }

        var i = n(15), r = n(6);
        t.exports = o, r(o.prototype), o.prototype.onError = function (t, e) {
            var n = new Error(t);
            return n.type = "TransportError", n.description = e, this.emit("error", n), this
        }, o.prototype.open = function () {
            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
        }, o.prototype.close = function () {
            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
        }, o.prototype.send = function (t) {
            if ("open" !== this.readyState) throw new Error("Transport not open");
            this.write(t)
        }, o.prototype.onOpen = function () {
            this.readyState = "open", this.writable = !0, this.emit("open")
        }, o.prototype.onData = function (t) {
            var e = i.decodePacket(t, this.socket.binaryType);
            this.onPacket(e)
        }, o.prototype.onPacket = function (t) {
            this.emit("packet", t)
        }, o.prototype.onClose = function () {
            this.readyState = "closed", this.emit("close")
        }
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            try {
                t = a.decode(t, {strict: !1})
            } catch (t) {
                return !1
            }
            return t
        }

        function i(t, e, n) {
            for (var o = new Array(t.length), i = c(t.length, n), r = function (t, n, i) {
                e(n, function (e, n) {
                    o[t] = n, i(e, o)
                })
            }, s = 0; s < t.length; s++) r(s, t[s], i)
        }

        var r = n(16), s = n(17), c = n(19), a = n(20);
        "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent);
        e.protocol = 3;
        var u = e.packets = {open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6}, p = r(u),
            h = {type: "error", data: "parser error"}, f = n(21);
        e.encodePacket = function (t, e, n, o) {
            "function" == typeof e && (o = e, e = !1), "function" == typeof n && (o = n, n = null);
            var i = (void 0 === t.data ? void 0 : t.data.buffer || t.data, u[t.type]);
            return void 0 !== t.data && (i += n ? a.encode(String(t.data), {strict: !1}) : String(t.data)), o("" + i)
        }, e.decodePacket = function (t, e, n) {
            if (void 0 === t) return h;
            if ("string" == typeof t) {
                if (n && (t = o(t), t === !1)) return h;
                var i = t.charAt(0);
                return Number(i) == i && p[i] ? t.length > 1 ? {type: p[i], data: t.substring(1)} : {type: p[i]} : h
            }
            var r = new Uint8Array(t), i = r[0], s = sliceBuffer(t, 1);
            return f && "blob" === e && (s = new f([s])), {type: p[i], data: s}
        }, e.encodePayload = function (t, n, o) {
            function r(t) {
                return t.length + ":" + t
            }

            function c(t, o) {
                e.encodePacket(t, !!a && n, !1, function (t) {
                    o(null, r(t))
                })
            }

            "function" == typeof n && (o = n, n = null);
            var a = s(t);
            return t.length ? void i(t, c, function (t, e) {
                return o(e.join(""))
            }) : o("0:")
        }, e.decodePayload = function (t, n, o) {
            "function" == typeof n && (o = n, n = null);
            var i;
            if ("" === t) return o(h, 0, 1);
            for (var r, s, c = "", a = 0, u = t.length; a < u; a++) {
                var p = t.charAt(a);
                if (":" === p) {
                    if ("" === c || c != (r = Number(c))) return o(h, 0, 1);
                    if (s = t.substr(a + 1, r), c != s.length) return o(h, 0, 1);
                    if (s.length) {
                        if (i = e.decodePacket(s, n, !1), h.type === i.type && h.data === i.data) return o(h, 0, 1);
                        var f = o(i, a + r, u);
                        if (!1 === f) return
                    }
                    a += r, c = ""
                } else c += p
            }
            return "" !== c ? o(h, 0, 1) : void 0
        }
    }, function (t, e) {
        "use strict";
        t.exports = Object.keys || function (t) {
            var e = [], n = Object.prototype.hasOwnProperty;
            for (var o in t) n.call(t, o) && e.push(o);
            return e
        }
    }, function (t, e, n) {
        function o(t) {
            if (!t || "object" != typeof t) return !1;
            if (i(t)) {
                for (var e = 0, n = t.length; e < n; e++) if (o(t[e])) return !0;
                return !1
            }
            if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(t) || "function" == typeof ArrayBuffer && t instanceof ArrayBuffer || s && t instanceof Blob || c && t instanceof File) return !0;
            if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length) return o(t.toJSON(), !0);
            for (var r in t) if (Object.prototype.hasOwnProperty.call(t, r) && o(t[r])) return !0;
            return !1
        }

        var i = n(18), r = Object.prototype.toString,
            s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === r.call(Blob),
            c = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === r.call(File);
        t.exports = o
    }, function (t, e) {
        var n = {}.toString;
        t.exports = Array.isArray || function (t) {
            return "[object Array]" == n.call(t)
        }
    }, function (t, e) {
        function n(t, e, n) {
            function i(t, o) {
                if (i.count <= 0) throw new Error("after called too many times");
                --i.count, t ? (r = !0, e(t), e = n) : 0 !== i.count || r || e(null, o)
            }

            var r = !1;
            return n = n || o, i.count = t, 0 === t ? e() : i
        }

        function o() {
        }

        t.exports = n
    }, function (t, e) {
        "use strict";

        function n(t) {
            for (var e, n, o = [], i = 0, r = t.length; i < r;) e = t.charCodeAt(i++), e >= 55296 && e <= 56319 && i < r ? (n = t.charCodeAt(i++), 56320 == (64512 & n) ? o.push(((1023 & e) << 10) + (1023 & n) + 65536) : (o.push(e), i--)) : o.push(e);
            return o
        }

        function o(t) {
            for (var e, n = t.length, o = -1, i = ""; ++o < n;) e = t[o], e > 65535 && (e -= 65536, i += d(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), i += d(e);
            return i
        }

        function i(t, e) {
            if (t >= 55296 && t <= 57343) {
                if (e) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
                return !1
            }
            return !0
        }

        function r(t, e) {
            return d(t >> e & 63 | 128)
        }

        function s(t, e) {
            if (0 == (4294967168 & t)) return d(t);
            var n = "";
            return 0 == (4294965248 & t) ? n = d(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (i(t, e) || (t = 65533), n = d(t >> 12 & 15 | 224), n += r(t, 6)) : 0 == (4292870144 & t) && (n = d(t >> 18 & 7 | 240), n += r(t, 12), n += r(t, 6)), n += d(63 & t | 128)
        }

        function c(t, e) {
            e = e || {};
            for (var o, i = !1 !== e.strict, r = n(t), c = r.length, a = -1, u = ""; ++a < c;) o = r[a], u += s(o, i);
            return u
        }

        function a() {
            if (l >= f) throw Error("Invalid byte index");
            var t = 255 & h[l];
            if (l++, 128 == (192 & t)) return 63 & t;
            throw Error("Invalid continuation byte")
        }

        function u(t) {
            var e, n, o, r, s;
            if (l > f) throw Error("Invalid byte index");
            if (l == f) return !1;
            if (e = 255 & h[l], l++, 0 == (128 & e)) return e;
            if (192 == (224 & e)) {
                if (n = a(), s = (31 & e) << 6 | n, s >= 128) return s;
                throw Error("Invalid continuation byte")
            }
            if (224 == (240 & e)) {
                if (n = a(), o = a(), s = (15 & e) << 12 | n << 6 | o, s >= 2048) return i(s, t) ? s : 65533;
                throw Error("Invalid continuation byte")
            }
            if (240 == (248 & e) && (n = a(), o = a(), r = a(), s = (7 & e) << 18 | n << 12 | o << 6 | r, s >= 65536 && s <= 1114111)) return s;
            throw Error("Invalid UTF-8 detected")
        }

        function p(t, e) {
            e = e || {};
            var i = !1 !== e.strict;
            h = n(t), f = h.length, l = 0;
            for (var r, s = []; (r = u(i)) !== !1;) s.push(r);
            return o(s)
        }/*! https://mths.be/utf8js v2.1.2 by @mathias */
        var h, f, l, d = String.fromCharCode;
        t.exports = {version: "2.1.2", encode: c, decode: p}
    }, function (t, e) {
        function n(t) {
            return t.map(function (t) {
                if (t.buffer instanceof ArrayBuffer) {
                    var e = t.buffer;
                    if (t.byteLength !== e.byteLength) {
                        var n = new Uint8Array(t.byteLength);
                        n.set(new Uint8Array(e, t.byteOffset, t.byteLength)), e = n.buffer
                    }
                    return e
                }
                return t
            })
        }

        function o(t, e) {
            e = e || {};
            var o = new r;
            return n(t).forEach(function (t) {
                o.append(t)
            }), e.type ? o.getBlob(e.type) : o.getBlob()
        }

        function i(t, e) {
            return new Blob(n(t), e || {})
        }

        var r = "undefined" != typeof r ? r : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
            s = function () {
                try {
                    var t = new Blob(["hi"]);
                    return 2 === t.size
                } catch (t) {
                    return !1
                }
            }(), c = s && function () {
                try {
                    var t = new Blob([new Uint8Array([1, 2])]);
                    return 2 === t.size
                } catch (t) {
                    return !1
                }
            }(), a = r && r.prototype.append && r.prototype.getBlob;
        "undefined" != typeof Blob && (o.prototype = Blob.prototype, i.prototype = Blob.prototype), t.exports = function () {
            return s ? c ? Blob : i : a ? o : void 0
        }()
    }, function (t, e) {
        e.encode = function (t) {
            var e = "";
            for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
            return e
        }, e.decode = function (t) {
            for (var e = {}, n = t.split("&"), o = 0, i = n.length; o < i; o++) {
                var r = n[o].split("=");
                e[decodeURIComponent(r[0])] = decodeURIComponent(r[1])
            }
            return e
        }
    }, function (t, e) {
        t.exports = function (t, e) {
            var n = function () {
            };
            n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
        }
    }, function (t, e) {
        "use strict";

        function n(t) {
            var e = "";
            do e = s[t % c] + e, t = Math.floor(t / c); while (t > 0);
            return e
        }

        function o(t) {
            var e = 0;
            for (p = 0; p < t.length; p++) e = e * c + a[t.charAt(p)];
            return e
        }

        function i() {
            var t = n(+new Date);
            return t !== r ? (u = 0, r = t) : t + "." + n(u++)
        }

        for (var r, s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), c = 64, a = {}, u = 0, p = 0; p < c; p++) a[s[p]] = p;
        i.encode = n, i.decode = o, t.exports = i
    }, function (t, e, n) {
        "use strict";
        var o = n(26);
        t.exports = function (t) {
            var e = t.xdomain, n = t.xscheme, i = t.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!e || o)) return new XMLHttpRequest
            } catch (t) {
            }
            try {
                if ("undefined" != typeof XDomainRequest && !n && i) return new XDomainRequest
            } catch (t) {
            }
            if (!e) try {
                return new (self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
            } catch (t) {
            }
        }
    }, function (t, e) {
        try {
            t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
        } catch (e) {
            t.exports = !1
        }
    }, function (t, e, n) {
        "use strict";

        function o(t) {
            var e = t && t.forceBase64;
            e && (this.supportsBinary = !1), "undefined" != typeof wx && "undefined" == typeof WebSocket || (this.perMessageDeflate = t.perMessageDeflate, this.usingBrowserWebSocket = i && !t.forceNode, this.protocols = t.protocols, this.usingBrowserWebSocket || (h = r)), s.call(this, t)
        }

        var i, r, s = n(14), c = n(15), a = n(22), u = n(23), p = n(24);
        n(4)("engine.io-client:websocket");
        if ("undefined" == typeof wx || "undefined" != typeof WebSocket) if ("undefined" != typeof WebSocket) i = WebSocket; else if ("undefined" != typeof self) i = self.WebSocket || self.MozWebSocket; else try {
            r = n(28)
        } catch (t) {
        }
        var h = i || r;
        "undefined" != typeof wx && "undefined" == typeof WebSocket && (h = function (t) {
            var e = this;
            e.onopen = function () {
            }, e.onclose = function () {
            }, e.onmessage = function (t) {
            }, e.onerror = function (t) {
            }, e.send = function (t) {
                wx.sendSocketMessage({data: t})
            }, e.close = function () {
                wx.closeSocket()
            }, wx.onSocketOpen(function (t) {
                e.onopen()
            }), wx.onSocketError(function (t) {
                e.onerror(t)
            }), wx.onSocketMessage(function (t) {
                e.onmessage(t)
            }), wx.onSocketClose(function (t) {
                e.onclose()
            }), wx.connectSocket({url: t})
        }), t.exports = o, u(o, s), o.prototype.name = "websocket", o.prototype.supportsBinary = !1, o.prototype.doOpen = function () {
            if (this.check()) {
                var t, e = this.uri();
                "undefined" != typeof wx && "undefined" == typeof WebSocket || (t = this.protocols);
                var n;
                n = "undefined" != typeof wx && "undefined" == typeof WebSocket ? {agent: this.agent} : {
                    agent: this.agent,
                    perMessageDeflate: this.perMessageDeflate
                }, n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (n.headers = this.extraHeaders), this.localAddress && (n.localAddress = this.localAddress);
                try {
                    "undefined" != typeof wx && "undefined" == typeof WebSocket ? this.ws = new h(e) : this.ws = this.usingBrowserWebSocket && !this.isReactNative ? t ? new h(e, t) : new h(e) : new h(e, t, n)
                } catch (t) {
                    return this.emit("error", t)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
            }
        }, o.prototype.addEventListeners = function () {
            var t = this;
            this.ws.onopen = function () {
                t.onOpen()
            }, this.ws.onclose = function () {
                t.onClose()
            }, this.ws.onmessage = function (e) {
                t.onData(e.data)
            }, this.ws.onerror = function (e) {
                t.onError("websocket error", e)
            }
        }, o.prototype.write = function (t) {
            function e() {
                n.emit("flush"), setTimeout(function () {
                    n.writable = !0, n.emit("drain")
                }, 0)
            }

            var n = this;
            this.writable = !1;
            for (var o = t.length, i = 0, r = o; i < r; i++) !function (t) {
                c.encodePacket(t, n.supportsBinary, function (i) {
                    if ("undefined" != typeof wx && "undefined" == typeof WebSocket) try {
                        n.ws.send(i)
                    } catch (t) {
                    } else {
                        if (!n.usingBrowserWebSocket) {
                            var r = {};
                            if (t.options && (r.compress = t.options.compress), n.perMessageDeflate) {
                                var s = "string" == typeof i ? Buffer.byteLength(i) : i.length;
                                s < n.perMessageDeflate.threshold && (r.compress = !1)
                            }
                        }
                        try {
                            n.usingBrowserWebSocket ? n.ws.send(i) : n.ws.send(i, r)
                        } catch (t) {
                        }
                    }
                    --o || e()
                })
            }(t[i])
        }, o.prototype.onClose = function () {
            s.prototype.onClose.call(this)
        }, o.prototype.doClose = function () {
            "undefined" != typeof this.ws && this.ws.close()
        }, o.prototype.uri = function () {
            var t = this.query || {}, e = this.secure ? "wss" : "ws", n = "";
            this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (n = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = p()), this.supportsBinary || (t.b64 = 1), t = a.encode(t), t.length && (t = "?" + t);
            var o = this.hostname.indexOf(":") !== -1;
            return e + "://" + (o ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
        }, o.prototype.check = function () {
            return !(!h || "__initialize" in h && this.name === o.prototype.name)
        }
    }, function (t, e) {
    }, function (t, e) {
        var n = [].indexOf;
        t.exports = function (t, e) {
            if (n) return t.indexOf(e);
            for (var o = 0; o < t.length; ++o) if (t[o] === e) return o;
            return -1
        }
    }, function (t, e, n) {
        "use strict";

        function o(t, e, n) {
            this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, n && n.query && (this.query = n.query), this.io.autoConnect && this.open()
        }

        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, r = n(5), s = n(6), c = n(31), a = n(32), u = n(33), p = (n(4)("socket.io-client:socket"), n(22)), h = n(17);
        t.exports = e = o;
        var f = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        }, l = s.prototype.emit;
        s(o.prototype), o.prototype.subEvents = function () {
            if (!this.subs) {
                var t = this.io;
                this.subs = [a(t, "open", u(this, "onopen")), a(t, "packet", u(this, "onpacket")), a(t, "close", u(this, "onclose"))]
            }
        }, o.prototype.open = o.prototype.connect = function () {
            return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this)
        }, o.prototype.send = function () {
            var t = c(arguments);
            return t.unshift("message"), this.emit.apply(this, t), this
        }, o.prototype.emit = function (t) {
            if (f.hasOwnProperty(t)) return l.apply(this, arguments), this;
            var e = c(arguments), n = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : h(e)) ? r.BINARY_EVENT : r.EVENT,
                data: e
            };
            return n.options = {}, n.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (this.acks[this.ids] = e.pop(), n.id = this.ids++), this.connected ? this.packet(n) : this.sendBuffer.push(n), this.flags = {}, this
        }, o.prototype.packet = function (t) {
            t.nsp = this.nsp, this.io.packet(t)
        }, o.prototype.onopen = function () {
            if ("/" !== this.nsp) if (this.query) {
                var t = "object" === i(this.query) ? p.encode(this.query) : this.query;
                this.packet({type: r.CONNECT, query: t})
            } else this.packet({type: r.CONNECT})
        }, o.prototype.onclose = function (t) {
            this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t)
        }, o.prototype.onpacket = function (t) {
            var e = t.nsp === this.nsp, n = t.type === r.ERROR && "/" === t.nsp;
            if (e || n) switch (t.type) {
                case r.CONNECT:
                    this.onconnect();
                    break;
                case r.EVENT:
                    this.onevent(t);
                    break;
                case r.BINARY_EVENT:
                    this.onevent(t);
                    break;
                case r.ACK:
                    this.onack(t);
                    break;
                case r.BINARY_ACK:
                    this.onack(t);
                    break;
                case r.DISCONNECT:
                    this.ondisconnect();
                    break;
                case r.ERROR:
                    this.emit("error", t.data)
            }
        }, o.prototype.onevent = function (t) {
            var e = t.data || [];
            null != t.id && e.push(this.ack(t.id)), this.connected ? l.apply(this, e) : this.receiveBuffer.push(e)
        }, o.prototype.ack = function (t) {
            var e = this, n = !1;
            return function () {
                if (!n) {
                    n = !0;
                    var o = c(arguments);
                    e.packet({type: h(o) ? r.BINARY_ACK : r.ACK, id: t, data: o})
                }
            }
        }, o.prototype.onack = function (t) {
            var e = this.acks[t.id];
            "function" == typeof e && (e.apply(this, t.data), delete this.acks[t.id])
        }, o.prototype.onconnect = function () {
            this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
        }, o.prototype.emitBuffered = function () {
            var t;
            for (t = 0; t < this.receiveBuffer.length; t++) l.apply(this, this.receiveBuffer[t]);
            for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
            this.sendBuffer = []
        }, o.prototype.ondisconnect = function () {
            this.destroy(), this.onclose("io server disconnect")
        }, o.prototype.destroy = function () {
            if (this.subs) {
                for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                this.subs = null
            }
            this.io.destroy(this)
        }, o.prototype.close = o.prototype.disconnect = function () {
            return this.connected && this.packet({type: r.DISCONNECT}), this.destroy(), this.connected && this.onclose("io client disconnect"), this
        }, o.prototype.compress = function (t) {
            return this.flags.compress = t, this
        }, o.prototype.binary = function (t) {
            return this.flags.binary = t, this
        }
    }, function (t, e) {
        function n(t, e) {
            var n = [];
            e = e || 0;
            for (var o = e || 0; o < t.length; o++) n[o - e] = t[o];
            return n
        }

        t.exports = n
    }, function (t, e) {
        "use strict";

        function n(t, e, n) {
            return t.on(e, n), {
                destroy: function () {
                    t.removeListener(e, n)
                }
            }
        }

        t.exports = n
    }, function (t, e) {
        var n = [].slice;
        t.exports = function (t, e) {
            if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
            var o = n.call(arguments, 2);
            return function () {
                return e.apply(t, o.concat(n.call(arguments)))
            }
        }
    }, function (t, e) {
        function n(t) {
            t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
        }

        t.exports = n, n.prototype.duration = function () {
            var t = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var e = Math.random(), n = Math.floor(e * this.jitter * t);
                t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n
            }
            return 0 | Math.min(t, this.max)
        }, n.prototype.reset = function () {
            this.attempts = 0
        }, n.prototype.setMin = function (t) {
            this.ms = t
        }, n.prototype.setMax = function (t) {
            this.max = t
        }, n.prototype.setJitter = function (t) {
            this.jitter = t
        }
    }, function (t, e, n) {
        function o(t, e, n) {
            var o = e && n || 0, p = e || [];
            t = t || {};
            var h = t.node || i, f = void 0 !== t.clockseq ? t.clockseq : r;
            if (null == h || null == f) {
                var l = s();
                null == h && (h = i = [1 | l[0], l[1], l[2], l[3], l[4], l[5]]), null == f && (f = r = 16383 & (l[6] << 8 | l[7]))
            }
            var d = void 0 !== t.msecs ? t.msecs : (new Date).getTime(), y = void 0 !== t.nsecs ? t.nsecs : u + 1,
                m = d - a + (y - u) / 1e4;
            if (m < 0 && void 0 === t.clockseq && (f = f + 1 & 16383), (m < 0 || d > a) && void 0 === t.nsecs && (y = 0), y >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            a = d, u = y, r = f, d += 122192928e5;
            var b = (1e4 * (268435455 & d) + y) % 4294967296;
            p[o++] = b >>> 24 & 255, p[o++] = b >>> 16 & 255, p[o++] = b >>> 8 & 255, p[o++] = 255 & b;
            var g = d / 4294967296 * 1e4 & 268435455;
            p[o++] = g >>> 8 & 255, p[o++] = 255 & g, p[o++] = g >>> 24 & 15 | 16, p[o++] = g >>> 16 & 255, p[o++] = f >>> 8 | 128, p[o++] = 255 & f;
            for (var v = 0; v < 6; ++v) p[o + v] = h[v];
            return e ? e : c(p)
        }

        var i, r, s = n(36), c = n(37), a = 0, u = 0;
        t.exports = o
    }, function (t, e) {
        var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (n) {
            var o = new Uint8Array(16);
            t.exports = function () {
                return n(o), o
            }
        } else {
            var i = new Array(16);
            t.exports = function () {
                for (var t, e = 0; e < 16; e++) 0 === (3 & e) && (t = 4294967296 * Math.random()), i[e] = t >>> ((3 & e) << 3) & 255;
                return i
            }
        }
    }, function (t, e) {
        function n(t, e) {
            var n = e || 0, i = o;
            return [i[t[n++]], i[t[n++]], i[t[n++]], i[t[n++]], "-", i[t[n++]], i[t[n++]], "-", i[t[n++]], i[t[n++]], "-", i[t[n++]], i[t[n++]], "-", i[t[n++]], i[t[n++]], i[t[n++]], i[t[n++]], i[t[n++]], i[t[n++]]].join("")
        }

        for (var o = [], i = 0; i < 256; ++i) o[i] = (i + 256).toString(16).substr(1);
        t.exports = n
    }])
});