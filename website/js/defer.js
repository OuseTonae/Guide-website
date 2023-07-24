$(function () {
    $("#submit")
        .click(function e(t) {
            let i = $("#search")
                .val()
                .trim();
            i && ($(".web-menu button")
                .eq(0)
                .addClass("active")
                .siblings()
                .removeClass("active"),
                $(".group-video").html()
                    .css("display") && ($(".bilibili_iframe")
                        .css("display", "none"), $("iframe")
                            .attr("src", "")), $(".web-list .web-grid")
                                .removeClass("filter_web"), $(".web-list .web-grid")
                                    .each(function () {
                                        (-1 != ($(this)
                                            .find(".web-single h2")
                                            .text() + $(this)
                                                .find(".web-single p>span:first")
                                                .text())
                                            .toUpperCase()
                                            .search(i.toUpperCase()) || -1 != $(this)
                                                .find(".web-single")
                                                .attr("data-content")
                                                .split("<span")[0].toUpperCase()
                                                .search(i.toUpperCase())) && $(this)
                                                    .addClass("filter_web")
                                    }), $grid.isotope({
                                        filter: ".filter_web"
                                    }), set_footer())
        }),
        $("#search").keydown(e => {
            13 === e.keyCode && $("#submit").click()
        }),
        localStorage.setItem("is_sort_like_num", 1), $("#scroll-to-hot")
            .click(function e(t) {
                1 == localStorage.getItem("is_sort_like_num") ? ($grid.isotope({
                    sortBy: "like-num-sort",
                    sortAscending: !1
                }), localStorage.setItem("is_sort_like_num", 0)) : ($grid.isotope({
                    sortBy: "original-order",
                    sortAscending: !0
                }), localStorage.setItem("is_sort_like_num", 1))
            }), $(".web-grid-web mya")
                .click(function e(t) {
                    return window.open($(this)
                        .attr("href")), !1
                }), $(".web-grid-web mya p>.iconfont")
                    .click(function e(t) {
                        console.log("点赞"), $(this)
                            .css("font-size", "20px"), $(this)
                                .css("bottom", "-4px"), $(this)
                                    .css("right", "-4px"), setTimeout(() => {
                                        $(this)
                                            .css("font-size", "16px"), $(this)
                                                .css("bottom", "-2px"), $(this)
                                                    .css("right", "-2px")
                                    }, 300);
                        let i = $(this)
                            .parent()
                            .parent()
                            .parent()
                            .parent(),
                            s = $(this)
                                .parent()
                                .parent(),
                            a = i.attr("id");
                        if ("like_flag" == localStorage.getItem(a)) console.log("已赞");
                        else {
                            let l = parseInt(i.find("p>.like-num")
                                .text()) + 1;
                            console.log(l), i.find("p>.like-num")
                                .text(l), $(".popover-body span.like-num")
                                    .text(l), i.find("p>.like-num")
                                        .addClass("like_flag"), i.find("p>.iconfont")
                                            .addClass("like_flag"), $(".popover-body span")
                                                .addClass("like_flag"), $(".popover-body span.like-num")
                                                    .text(l);
                            let n = s.attr("data-content"),
                                o = (n = n.replace(/null/g, "like_flag"))
                                    .split("</span>")[1].split(">")[1];
                            n = n.replace(o + "<", l + "<"), s.attr("data-content", n), localStorage.setItem(a, "like_flag"), $grid.isotope("updateSortData", $grid.children()),
                                $.ajax({
                                    data: {
                                        web_grid: a
                                    },
                                    error(e) { },
                                    success(e) { }
                                })
                        }
                        t.stopPropagation()
                    }), $(".phone-modal .hide-modal")
                        .click(function e(t) {
                            let i = $(this)
                                .attr("web_grid"),
                                s = $(`#${i}`);
                            if (console.log(i), "like_flag" == localStorage.getItem(i)) console.log("已赞");
                            else {
                                let a = parseInt(s.find("p>.like-num")
                                    .text()) + 1;
                                s.find("p>.like-num")
                                    .text(a), s.find("p>.like-num")
                                        .addClass("like_flag"), s.find("p>.iconfont")
                                            .addClass("like_flag"), $(".phone-modal")
                                                .find(".iconfont")
                                                .addClass("like_flag"), $(".phone-modal")
                                                    .find(".like-num")
                                                    .addClass("like_flag"), $(".phone-modal")
                                                        .find(".like-num")
                                                        .text(a), localStorage.setItem(i, "like_flag"), $grid.isotope("updateSortData", $grid.children()), $.ajax({
                                                            data: {
                                                                web_grid: i
                                                            },
                                                            error(e) { },
                                                            success(e) { }
                                                        })
                            }
                        }),
        console.log(`
GitHub: https://github.com/OuseTonae

Website: https://www.ousetonae.com

Email: ousetonae@qq.com

`),
        $('[data-toggle="popover"]')
            .popover({
                container: "body",
                content: "暂无简介",
                placement: "top",
                trigger: "hover"
            }),
        localStorage.getItem("is_show_disclaimer") || localStorage.setItem("is_show_disclaimer", 1),
        1 == localStorage.getItem("is_show_disclaimer") && setTimeout(() => {
            $("#clickDisclaimer")
                .click()
        }, 300),
        $("#DisclaimerClose")
            .click(() => {
                localStorage.setItem("is_show_disclaimer", 0)
            })
})