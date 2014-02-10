<?php /* @var $this Controller */ ?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="language" content="en" />

<link rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl;?>/data/css/common.css"/>

<script type="text/javascript">
	var GLOB = {
		baseUrl: '<?php echo Yii::app()->request->baseUrl;?>'
	};
</script>

<? Yii::app()->clientScript->scriptMap = array('jquery.js'=>false);?>
<script src="<?php echo Yii::app()->request->baseUrl;?>/data/js/libs/jquery.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl;?>/data/js/libs/baron_scroll.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl;?>/data/js/libs/serialize.js"></script>

<script src="<?php echo Yii::app()->request->baseUrl;?>/data/js/common/hint.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl;?>/data/js/common/snippets.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl;?>/data/js/common/page.js"></script>

<title><?php echo CHtml::encode($this->pageTitle);?></title>
</head>
<body>

<div class="b-bg">
	<img class="b-bg__img" id="js-b-bg__img" src="" alt=""/>
</div>

<?php echo $content;?>

</body>
</html>