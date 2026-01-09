# MeshViewer

Simple 3D objects file viewer in Three.JS (WebGL)

## Target

The objective is to create a simple object viewer that can well handle low-rez 3d meshes & textures for CollectiveAccess.


## Demo
[Click here](https://archeo.ideesculture.fr/index.php/3d/Index) to see a live demo of the 3D mesh viewer with some OBJ examples.

Just select the example you want to show in the examples menu.

## Howto 

This viewer is easy to handle, give the path to the obj & mtl files, the ID where you want the viewer to be in, eventually a format if it can't be guessed

``` html 
<script type="text/javascript">
meshviewer({
  'meshFile' : 'examples/cow/mesh.obj',
  'mtlFile' : 'examples/cow/mesh.mtl', 
  'container':'#viewer', 
  'format':'obj'});
</script>
<div id="viewer">
</div>
```

See index.html for more informations.

## Large File Handling

The viewer includes protection against loading very large OBJ files that could crash your browser:

- **Warning limit** (default: 20 MB): Files larger than this will show a warning dialog asking for confirmation before loading.
- **Hard limit** (default: 50 MB): Files larger than this will not be loaded at all to prevent browser crashes.

You can customize these limits using the `warnFileSize` and `maxFileSize` settings:

``` html
<script type="text/javascript">
meshviewer({
  'meshFile' : 'examples/maya/mesh.obj',
  'mtlFile' : 'examples/maya/mesh.mtl', 
  'container':'#viewer', 
  'format':'obj',
  'warnFileSize': 10*1024*1024,  // Warn at 10 MB
  'maxFileSize': 100*1024*1024   // Hard limit at 100 MB
});
</script>
```

## Credits
Icons : [Gentleface](http://www.gentleface.com/free_icon_set.html) licence Creative Commons Attribution-NonCommercial
