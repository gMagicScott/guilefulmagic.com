$(document).ready(function () {
//initalize the global pcpDialog
    $('#pcpDialog').dialog({
        bgiframe: true,
        autoOpen: false,
        height: 575,
        width: 680,
        modal: true,
        dialogClass: 'ui-alert'
    });
    $("#showAlerts,#showNotices").click(function () {
        if (this.id === "showAlerts") {
            $("#moreAlertsMsg").remove();
            $("#moreAlerts").show();
        } else {
            $("#moreNoticesMsg").remove();
            $("#moreNotices").show();
        }
        return false;
    });
    $("a.dismiss").live("click", function () {
        // get person type, user id, alert id and gig id
        var el, typ, uid, aid, gid, idvals, i;
        el = '#' + this.id;
        idvals = this.id.split("-");
        for (i = 0; i <= idvals.length - 1; i += 1) {
            if (idvals[i].substring(0, 3) === "typ") {
                if (idvals[i].substring(3) === "0") {
                    typ = "performer";
                } else if (idvals[i].substring(3) === "1") {
                    typ = "client";
                }
            } else if (idvals[i].substring(0, 3) === "uid") {
                uid = idvals[i].substring(3);
            } else if (idvals[i].substring(0, 3) === "aid") {
                aid = idvals[i].substring(3);
            } else if (idvals[i].substring(0, 3) === "gid") {
                gid = idvals[i].substring(3);
            }
        }
        if (!gid) {
            gid = '0';
        }
        // dismiss alert (save info to db)
        $.ajax({
            url: "/api/DismissAlerts.ashx",
            data: { memberType: typ, userID: uid, alertID: aid, gigID: gid },
            success: function (dismiss) {
                if (dismiss.status === "0") {
                    var more, first, showMore;
                    more = $(el).parents(".pcp-alert,.pcp-notice").find("#moreAlerts,#moreNotices").children();
                    first = false;
                    if ($(el).parent().get(0).tagName.toLowerCase() === "span") {
                        first = true;
                    }
                    if (first) {
                        switch (more.length) {
                            case 0:
                                // First alert dismissed, none left
                                $(el).parents(".pcp-alert,.pcp-notice").remove();
                                break;
                            case 1:
                                // First alert dismissed, 1 left
                                $(more).parents(".pcp-list").remove();
                                $(el).parent().html($(more[0]).html());
                                break;
                            default:
                                // First alert dismissed, more than 1 left
                                showMore = $(el).parents(".pcp-alert,.pcp-notice").find("#showAlerts,#showNotices");
                                $(more[0]).remove();
                                $(el).parent().html($(more[0]).html());
                                // Update more alerts/notices message if visible
                                if (showMore) {
                                    if ($(showMore).attr("id") === "showAlerts") {
                                        if (more.length - 1 > 1) {
                                            $(showMore).html(more.length - 1 + " other alerts");
                                        } else {
                                            $(showMore).html(more.length - 1 + " other alert");
                                        }
                                    } else if ($(showMore).attr("id") === "showNotices") {
                                        if (more.length - 1 > 1) {
                                            $(showMore).html(more.length - 1 + " other notifications");
                                        } else {
                                            $(showMore).html(more.length - 1 + " other notification");
                                        }
                                    }
                                }
                        }
                    } else {
                        switch (more.length) {
                            case 1:
                                // Second alert dismissed, none left
                                $(el).parents(".pcp-list").remove();
                                break;
                            default:
                                // Second or lower alert dismissed, 1 or more left
                                $(el).parent().remove();
                        }
                    }
                } else if (dismiss.status === "-1") {
                    if (!$("div.error").length) {
                        $("#content-1col1").prepend("<div class=\"error\">An error has occurred.</div>");
                    } else {
                        $("div.error").html("An error has occurred.");
                    }
                }
            }
        }); // ajax end
        return false;
    }); // dismiss end
    // Display the most recent performer blog entries.
    if (blogFeed) {
         GetRecentBlogPostsByTags()
     }

     //Make dialog links open a dialog!
     $("a.dialogLink").click(function (e) {
         e.preventDefault();
         if ($(this).hasClass('blogpost')) {
             GetBlogPostByID($(this).attr('name'));
         }
     });
}); // document ready end

//gets a blog post from performer-blog.gigmasters.com by ID
 function GetBlogPostByID(articleID) {
    //reset dialog view
    $('#pcpDialog').html('<center>Please wait - retrieving results!<br /><img src="https://dd86mil3sc3or.cloudfront.net/images/ajax-loader.gif" /></center>')
    $('#pcpDialog').dialog('option', 'title', 'Please wait, loading...');

    //call to performer blog handler to get post
    $.ajax({
        type: "POST",
        crossDomain: true,
        url: 'https://performer-blog.gigmasters.com/remote-handlers/get-post-by-ID.php?db_host=performer-blog&postID=' + articleID,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data, status, jqXHR) {
        //feed post information into the dialog HTML
            $('#pcpDialog').dialog('option', 'title', data.POST[0].post_title);
            $('#pcpDialog').html(data.POST[0].post_content);
        }
    })

    //open the dialog box
    $('#pcpDialog').dialog('open');
}

//gets an array of the most recent performer blog posts by tag
function GetRecentBlogPostsByTags() {
    $.ajax({
        url: "https://performer-blog.gigmasters.com/remote-handlers/get-posts.php?db_host=performer-blog&tags=" + tags + "&max_posts=" + max_posts,
        dataType: "jsonp",
        crossDomain: true,
        success: function (data, status, jqXHR) {
            //arrays to hold content for output
            var latestPosts = '';

            for (i = 0; i < max_posts; i += 1) {
                latestPosts += '\n<li><a href="' + data.POSTS[i].post_url + '" name="' + data.POSTS[i].post_ID + '" class="dialogLink blogpost">' + data.POSTS[i].post_title + '</a></li>';
            }

            //display content in HTML tag
            $('#latestPosts').html(latestPosts);
            $("a.dialogLink").click(function (e) {
                e.preventDefault();
                if ($(this).hasClass('blogpost')) {
                    GetBlogPostByID($(this).attr('name'));
                }
            });
        },
        error: function (jqXHR, status, errorMsg) {
            $('#latestPosts').html("<!-- AJAX failed: status=" + status + "\n" + errorMsg + "-->");
        }
    });
}