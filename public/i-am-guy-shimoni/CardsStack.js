import React from 'react'
import Card from '../Components/Card'
class CardsStack extends React.Component {
    render() {
        var props = this.props;
        var state = this.state;
        return React.createElement("div", {
                style: {
                    position: 'relative',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    display: 'flex',
                    borderStyle: 'solid',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    overflow: 'hidden',
                    height: '550px',
                    width: '1000px'
                },
                "data-tid": "2e2xiodmxmo"
            },
            React.createElement("div", {
                    style: {
                        height: '40px',
                        margin: '0 auto',
                        alignItems: 'center',
                        width: '250px',
                        justifyContent: 'space-between',
                        display: 'flex'
                    },
                    "data-tid": "zu57ue840zr"
                },
                React.createElement("a", {
                        style: {
                            textAlign: 'center',
                            display: 'inline-block',
                            width: '30px'
                        },
                        href: "https://www.linkedin.com/in/shimoniguy/",
                        "data-tid": "vz30ztyf8qj"
                    },
                    React.createElement("i", {
                        "data-tid": "8et1xqdo8a9",
                        className: "fa fa-linkedin",
                        style: {
                            fontSize: '25px',
                            color: 'rgba(0,0,0,0.29)'
                        }
                    })
                ),
                React.createElement("img", {
                    style: {
                        animationDuration: '.5s',
                        animationName: state.imgAnim,
                        width: '50px'
                    },
                    onClick: (e) => {
                        if (e && e.currentTarget && window.mixpanel && e.type === 'click') {
                            window.track(e, this);
                        };
                        var value = e && e.currentTarget && e.currentTarget.value;
                        this.clickImg();
                    },
                    src: state.imgs[0],
                    "data-tid": "p1zu0spklb"
                }),
                React.createElement("a", {
                        style: {
                            width: '30px'
                        },
                        href: "mailto:yo@guyshimoni.com",
                        "data-tid": "if212hf9sai"
                    },
                    React.createElement("i", {
                        "data-tid": "9bw042lzv5u",
                        className: "fa fa-envelope-o",
                        style: {
                            textAlign: 'center',
                            width: '30px',
                            fontSize: '25px',
                            color: 'rgba(0,0,0,0.2)'
                        }
                    })
                )
            ),
            React.createElement("div", {
                    style: {
                        height: '380px',
                        position: 'relative',
                        justifyContent: 'center',
                        display: 'flex'
                    },
                    "data-tid": "226e8p0j9cj"
                },
                React.createElement("h1", {
                        style: {
                            boxShadow: '0 0 50px rgba(0,0,0,0.7)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            position: 'absolute',
                            transform: 'rotate(-1deg)',
                            height: '350px',
                            width: '250px',
                            backgroundColor: '#dec9e4',
                            color: '#d22a94'
                        },
                        "data-tid": "frfnufzblg9"
                    },
                    "The Start"
                ),
                this.cards && this.cards.map && this.cards.map((i, j) => (React.createElement(Card, {
                    key: j,
                    width: 250,
                    height: 380,
                    pos: j,
                    onSwipe: this.swipe.bind(this),
                    clickBottom: this.openPopup.bind(this),
                    data: i,
                    "data-tid": "1n5hwx1x6h7"
                })))
            ),
            React.createElement("div", {
                    style: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        height: '50px'
                    },
                    "data-tid": "4a3uyhdobnd"
                },
                React.createElement("button", {
                        style: {
                            boxShadow: '0 0 25px rgba(0, 0, 0, 0.3)',
                            borderStyle: 'none',
                            width: '50px',
                            height: '50px',
                            backgroundColor: 'rgba(255,255,255,1)',
                            borderRadius: '25px',
                            color: '#eeeeee'
                        },
                        onClick: (e) => {
                            if (e && e.currentTarget && window.mixpanel && e.type === 'click') {
                                window.track(e, this);
                            };
                            var value = e && e.currentTarget && e.currentTarget.value;
                            this.swipeLeft("Left");
                        },
                        "data-tid": "jqgpv6eufmp"
                    },
                    React.createElement("i", {
                        "data-tid": "rwccjs1gc3q",
                        className: "fa fa-times",
                        style: {
                            fontSize: '20px',
                            color: 'rgba(252,104,102,1)'
                        }
                    })
                ),
                React.createElement("button", {
                        style: {
                            boxShadow: '0 0 25px rgba(0, 0, 0, 0.3)',
                            marginRight: '20px',
                            marginLeft: '20px',
                            borderStyle: 'none',
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(255,255,255,1)',
                            borderRadius: '25px',
                            color: '#eeeeee'
                        },
                        onClick: (e) => {
                            if (e && e.currentTarget && window.mixpanel && e.type === 'click') {
                                window.track(e, this);
                            };
                            var value = e && e.currentTarget && e.currentTarget.value;
                            this.clickImg();
                        },
                        "data-tid": "94i5osnknyq"
                    },
                    React.createElement("i", {
                        "data-tid": "2rtfw76cdxf",
                        className: "fa fa-star",
                        style: {
                            fontSize: '20px',
                            color: 'rgba(29,165,186,1)'
                        }
                    })
                ),
                React.createElement("button", {
                        style: {
                            boxShadow: '0 0 25px rgba(0, 0, 0, 0.3)',
                            borderStyle: 'none',
                            width: '50px',
                            height: '50px',
                            backgroundColor: 'rgba(255,255,255,1)',
                            borderRadius: '25px',
                            color: '#eeeeee'
                        },
                        onClick: (e) => {
                            if (e && e.currentTarget && window.mixpanel && e.type === 'click') {
                                window.track(e, this);
                            };
                            var value = e && e.currentTarget && e.currentTarget.value;
                            this.swipeLeft("Right");
                        },
                        "data-tid": "cs8iyl9aaa"
                    },
                    React.createElement("i", {
                        "data-tid": "lgz67dfizj",
                        className: "fa fa-heart",
                        style: {
                            fontSize: '20px',
                            color: 'rgba(67,199,142,1)'
                        }
                    })
                )
            ),
            state.popup ?
            React.createElement("div", {
                    style: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: state.popup ? 'flex' : 'none',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                        top: '0px',
                        position: 'absolute'
                    },
                    onClick: (e) => {
                        if (e && e.currentTarget && window.mixpanel && e.type === 'click') {
                            window.track(e, this);
                        };
                        var value = e && e.currentTarget && e.currentTarget.value;
                        this.closePopup();
                    },
                    "data-tid": "sitqiabzv6"
                },
                React.createElement("div", {
                        style: {
                            marginTop: '-12px',
                            animationName: state.popanim,
                            animationDuration: '.5s',
                            borderWidth: '1px',
                            borderColor: '#cccccc',
                            borderStyle: 'solid',
                            borderRadius: '6px',
                            boxShadow: '0 0 115px rgba(0,0,0,0.5)',
                            backgroundColor: '#eeeeee',
                            height: '380px',
                            width: '250px'
                        },
                        "data-tid": "r7ktohtnsp"
                    },
                    React.createElement("p", {
                            style: {
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                flexDirection: 'column',
                                display: 'flex'
                            },
                            "data-tid": "rhfau7h13u"
                        },
                        state.popup.pop, React.createElement("img", {
                            style: {
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundImage: 'url(' + state.popup.popimg + ')',
                                width: '100px',
                                height: '100px',
                                backgroundColor: '#aaa',
                                borderRadius: '50%'
                            },
                            "data-tid": "935jifzx23l"
                        })
                    )
                )
            ) :
            null
        )
    }
    constructor(props) {
        super()
        this.state = {}
    }
    clickImg() {
        this.state.imgs.push(this.state.imgs.shift())
        this.setState({
            imgAnim: "bounceIn"
        })
        setTimeout(
            () => {
                this.setState({
                    imgAnim: null
                })
            }, 300
        )
    }
    swipeLeft(a, b) {
        var c = this.cards[this.cards.length - 1];
        c.removed = "rotateOutUp" + a;
        setTimeout(() => {
            this.cards.pop();
            this.setState({})
        }, 200)
        this.setState({})
    }
    closePopup() {
        this.setState({
            popanim: "bounceOutDown",
        });
        setTimeout(() => {
            this.setState({
                popup: null
            })
        }, 400);
    }
    openPopup(card) {
        this.setState({
            popanim: "bounceInUp",
            popup: card
        })
    }
    swipe(a, b) {
        this.cards.pop();
    }
    componentWillMount() {
        this.cards = [{
            title: "56457654754"
        }, {
            title: "546546546aaa"
        }]
        this.state.imgs = [
            "https://d2eyqiy4n03ve6.cloudfront.net/12345678-1234-1234-1234-1234567890ab/2015/02/26/dddf3af0-aa6b-4b19-a83e-b485a9feed44.gif",
            "https://d2eyqiy4n03ve6.cloudfront.net/12345678-1234-1234-1234-1234567890ab/2014/12/26/da4b15b1-a6fc-4c6b-9e17-2e18075634db.gif",
            "https://d2eyqiy4n03ve6.cloudfront.net/12345678-1234-1234-1234-1234567890ab/2015/01/08/e97e7229-85b8-4cd5-951b-0c7e13ca603b.gif",
            "https://d2eyqiy4n03ve6.cloudfront.net/12345678-1234-1234-1234-1234567890ab/2015/01/08/e6f9a8e6-a029-49f8-bbbf-094f21efebba.gif",
            "https://d2eyqiy4n03ve6.cloudfront.net/12345678-1234-1234-1234-1234567890ab/2015/01/13/1a37dd4e-23a3-4484-9d2b-b88a9aecf7e3.gif",
            "https://ci4.googleusercontent.com/proxy/KN01AAsppa_A6qKynhqWmenmkhITLFnybcZZIASWaxqih9eFXvZcCKOhmAqkJC8BW5jaMdPut6m8HTtVO-tqN4gASpa2WkEagwA1GnNwVjKPpXZnuaDelXA6bnr859EGe7d0Qt2AdhDNciz5QWkq1tyxchKdwhCA0SC6Y0nNQ_LKTogHDoGsmW_xweo=s0-d-e1-ft#http://static.wixstatic.com/media/41d000_6a544bd2b30d417c6dc64fa952011911.gif_srz_p_97_90_75_22_0.50_1.20_0.00_gif_srz"
        ]
    }
}
export default CardsStack;