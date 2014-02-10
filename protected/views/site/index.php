<?php
Yii::app()->clientScript
	->registerCssFile(Yii::app()->request->baseUrl .'/data/css/profile.css')

	->registerScriptFile(Yii::app()->request->baseUrl .'/data/js/libs/charts.js')

	->registerScriptFile(Yii::app()->request->baseUrl .'/data/js/profile/page.js')
	->registerScriptFile(Yii::app()->request->baseUrl .'/data/js/profile/init.js');
?>


111