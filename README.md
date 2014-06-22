# 3jsObjViewer
============

3D OBJ file viewer in Three.JS (WebGL)

## Howto 

This viewer is easy to handle, give the path to the obj & mtl files, the ID where you want the viewer to be in, eventually a format if it can't be guessed

``` html 
<script type="text/javascript">
meshviewer({
  'objFile' : 'examples/cow/mesh.obj',
  'mtlFile' : 'examples/cow/mesh.mtl', 
  'container':'#viewer', 
  'format':'obj'});
</script>
<div id="viewer">
</div>
```

See index.html for more informations.

## Credits
Icons : [Gentleface](http://www.gentleface.com/free_icon_set.html) licence Creative Commons Attribution-NonCommercial
