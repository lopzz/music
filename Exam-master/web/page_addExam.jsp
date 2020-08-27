<%@ taglib prefix="s" uri="/struts-tags" %>
<%--
  Created by IntelliJ IDEA.
  User: one
  Date: 12/31/2017
  Time: 4:23 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<!-- Mirrored from condorthemes.com/cleanzone/pages-blank-header.html by HTTrack Website Copier/3.x [XR&CO'2013], Mon, 31 Mar 2014 14:37:32 GMT -->
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="images/favicon.png">

    <title>Clean Zone</title>
    <!-- Bootstrap core CSS -->
    <link href="js/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="js/bootstrap.switch/bootstrap-switch.min.css" />
    <link rel="stylesheet" type="text/css" href="js/bootstrap.datetimepicker/css/bootstrap-datetimepicker.min.css" />

    <!-- Select2 -->
    <link rel="stylesheet" type="text/css" href="js/jquery.select2/select2.css" />


    <!-- Slider -->
    <link rel="stylesheet" type="text/css" href="js/bootstrap.slider/css/slider.css" />

    <!-- DateRange -->
    <link rel="stylesheet" type="text/css" href="js/bootstrap.daterangepicker/daterangepicker-bs3.css" />

    <!-- Custom styles for this template -->
    <link href="css/style.css" rel="stylesheet" />

    <link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/font-awesome/4.6.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="css/pygments.css">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <![endif]-->
    <link rel="stylesheet" type="text/css" href="js/jquery.nanoscroller/nanoscroller.css" />
    <link href="js/jquery.icheck/skins/square/blue.css" rel="stylesheet">

</head>

<body style="opacity: 1; margin-left: 0px;">

<!-- Fixed navbar -->
<%@include file="page_index_iframe.jsp"%>

    <div class="container-fluid" id="pcont">
        <div class="page-head">
            <h2>添加考试信息</h2>

        </div>

        <div class="cl-mcont">
            <div class="row">
                <div class="col-sm-6 col-md-4 ">

                </div>
                <div class="col-sm-6 col-md-6 ">
                    <div class="block-flat ">
                        <div class="header">
                            <h3>From</h3>
                        </div>
                        <div class="content">


                            <form role="form" action="addExam.action" method="post">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">选择考试类别</label>
                                    <div class="form-group">
                                        <select class="form-control" name="examEntity.categoryId">
                                            <s:iterator id="category" value="#request['AllCategory']">
                                                <option value="<s:property value="#category.categoryId"/> ">
                                                    <s:property value="#category.categoryName"/></option>
                                            </s:iterator>
                                        </select>
                                    </div>


                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">考试名称</label>
                                        <input type="text" placeholder="" class="form-control"
                                               name="examEntity.examName">
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">考试时间</label><br>
                                        <div class="form-group">
                                            <div class="input-group date datetime" data-date-format="yyyy-mm-dd  hh:ii"
                                                 data-link-field="dtp_input1">
                                                <input class="form-control" type="text"  readonly
                                                       name="examEntity.examTime">
                                                <span class="input-group-addon btn btn-primary"><span
                                                        class="glyphicon glyphicon-th"></span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">考试地点</label> <input type="text"
                                                                                                  placeholder=""
                                                                                                  class="form-control"
                                                                                                  name="examEntity.examPlace">
                                    </div>


                                </div>


                                <button class="btn btn-primary" type="submit">Submit</button>
                                <button class="btn btn-default">Cancel</button>
                            </form>
                        </div>


                    </div>
                </div>
            </div>


        </div>


    </div>

</div>

</div>

<script src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.nanoscroller/jquery.nanoscroller.js"></script>
<script type="text/javascript" src="js/jquery.sparkline/jquery.sparkline.min.js"></script>
<script type="text/javascript" src="js/jquery.easypiechart/jquery.easy-pie-chart.js"></script>
<script type="text/javascript" src="js/behaviour/general.js"></script>
<script src="js/jquery.ui/jquery-ui.js" type="text/javascript"></script>
<script type="text/javascript" src="js/jquery.nestable/jquery.nestable.js"></script>
<script type="text/javascript" src="js/bootstrap.switch/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="js/bootstrap.datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script src="js/jquery.select2/select2.min.js" type="text/javascript"></script>
<script src="js/bootstrap.slider/js/bootstrap-slider.js" type="text/javascript"></script>
<script type="text/javascript" src="js/jquery.gritter/js/jquery.gritter.js"></script>

<script type="text/javascript">
    $(document).ready(function () {
        //initialize the javascript
        App.init();
    });



</script>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="js/behaviour/voice-commands.js"></script>
<script src="js/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery.flot/jquery.flot.js"></script>
<script type="text/javascript" src="js/jquery.flot/jquery.flot.pie.js"></script>
<script type="text/javascript" src="js/jquery.flot/jquery.flot.resize.js"></script>
<script type="text/javascript" src="js/jquery.flot/jquery.flot.labels.js"></script>


<!-- Mirrored from condorthemes.com/cleanzone/pages-blank-header.html by HTTrack Website Copier/3.x [XR&CO'2013], Mon, 31 Mar 2014 14:37:32 GMT -->

</body>
</html>
