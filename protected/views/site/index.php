<?php
Yii::app()->clientScript
	->registerCssFile(Yii::app()->request->baseUrl .'/data/css/track.css')
	->registerScriptFile(Yii::app()->request->baseUrl .'/data/js/track/init.js');
?>


<div class="b-tracks">

	<!-- Item -->
	<div class="b-tracks__item">
		<div class="b-tracks__item__in">

			<!-- play btn -->
			<div class="b-tracks__item__play-btn">
				<div class="b-tracks__item__play-btn__in">
					<i class="b-tracks__item__play-btn__icon"></i>
				</div>
			</div>
			<!-- /play btn -->

			<div class="b-tracks__item__img__wrapper">
				<div class="b-tracks__item__img__color-filter b-tracks__item__img__color-filter_pink"></div>
				<img class="b-tracks__item__img" src="data/img/test_colored.jpg" alt=""/>
			</div>
		</div>
	</div>
	<!-- /Item -->

</div>