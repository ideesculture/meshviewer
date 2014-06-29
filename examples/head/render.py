# Execution :
# $ /Applications/blender/blender.app/Contents/MacOS/blender -b -P ~/test_blender.py -- Scene_2012_01_11_15_10_03
# avec : Scene_2012_01_11_15_10_03 : le nom du fichier obj
#
# Réalise :

import bpy 
import math
import mathutils
import sys
import os 

class locationxyz(list):
    pass

# main variables
rayon = 80


#meshname = "Scene_2012_01_11_15_10_03"
meshname = str(sys.argv[5])   

dir = "render"


angle = math.radians(5)
etapes = int(math.radians(360) / angle)

# camera position variables
x = rayon
y = 0
z = 4
targetLoc = locationxyz()
targetLoc.x = 0
targetLoc.y = 0
targetLoc.z = 0

# rendered image resolution
rnd = bpy.data.scenes[0].render  
rnd.resolution_x = 1280
rnd.resolution_y = 756
rnd.resolution_percentage = 50

def pointCameraToTarget(cam, targetLoc):
    # targetLoc is (x, y, z) of what we want to point at
    # camera angles appear to be set up so that
    #  cam.rotation_euler = Euler((0,0,0), 'XYZ') points downward,
    #  i.e., along the -z axis direction.
    # In the xy plane (i.e., rotate around z-axis):
    dx = targetLoc.x - cam.location.x
    dy = targetLoc.y - cam.location.y
    dz = targetLoc.z - cam.location.z
    #print("dx, dy, dz:", dx, dy, dz)
    # Signs are chosen carefully due to geometry.  If we rotate
    #  by this much from the -z orientation around the x-axis, we
    #  will be pointing along the y-axis (for angle < pi rad)
    xRad = (3.14159/2.) + math.atan2(dz, math.sqrt(dy**2 + dx**2))
    #print("xRad: %f, %f deg" % (xRad, xRad*180./math.pi))
    
    zRad = math.atan2(dy, dx) - (3.14159256 / 2.)
    #print("zRad: %f, %f deg" % (zRad, zRad*180./math.pi))
    cam.rotation_euler = mathutils.Euler((xRad, 0, zRad), 'XYZ')
    
def resetObjectPosition(ob):
	print("Obj:%s bounding box coords " %ob.name)
	minx = 0
	miny = 0
	minz = 0
	maxx = 0
	maxy = 0
	maxz = 0
	for [x,y,z] in ob.bound_box:
		print (x, y, z)
		if(x < minx):
			minx = x
		if(y<miny):
			miny = y
		if(z<minz):
			minz = z
		if(x > maxx):
			maxx = x
		if(y > maxy):
			maxy = y
		if(z > maxz):
			maxz = z
	print(str(minx)+" "+str(maxx)+" / "+str(miny)+" "+str(maxy)+" / "+str(minz)+" "+str(maxz))
	centre = sum((mathutils.Vector(b) for b in ob.bound_box), mathutils.Vector())
	centre /= 8
	# uncomment next line to display centre coordinates
	print(centre)
	cube.location.x = centre.x
	cube.location.y = -centre.y
	cube.location.z = centre.z
	print("obx = "+str(ob.location.x)+" oby: "+str(ob.location.y)+" obz: "+str(ob.location.z))
	print("sizex = "+str(ob.dimensions.x)+" y: "+str(ob.dimensions.y)+" z: "+str(ob.dimensions.z))
#	ob.location.x = ob.location.x + obj.dimensions.x/2
#	ob.location.y = obj.dimensions.y/2
#	ob.location.z = obj.dimensions.z/2

def sceneRadiusForCamera(obj):
	# the scene radius for the camera is taken from twice of max dimension, multipied by the golden number
	return (int(max(obj.dimensions.x,obj.dimensions.y,obj.dimensions.z))*2 *1.2)
 	#Math.max(
     #       boundingbox.box.max.y - boundingbox.box.min.y,
      #      boundingbox.box.max.z - boundingbox.box.min.z,
       #     boundingbox.box.max.x - boundingbox.box.min.x
        #)/2 * (1 + Math.sqrt(5)) ; // golden number to beautify display


# Suppression du cube présent par défaut
#bpy.ops.object.select_by_type(type='MESH')
cube = bpy.data.objects['Cube']
#bpy.ops.object.delete()

currentdir = os.getcwd()

# Chargement d'un fichier OBJ
bpy.ops.import_scene.obj(filepath= meshname + '.obj',axis_forward='X', axis_up='Z')

if not os.path.exists(currentdir + "/" + dir):
    os.makedirs(currentdir + "/" + dir)
#os.chdir(dir)
#print(currentdir)
#sys.exit()

lamp = bpy.data.objects['Lamp'] # bpy.types.Camera
lamp.location = (0, -20, 10)
lamp.scale = (1, 1, 1)
bpy.data.lamps[0].energy = 250

# Cam rotation part
camera = bpy.data.objects['Camera'] # bpy.types.Camera

object = bpy.data.objects[meshname]
resetObjectPosition(object)
print(sceneRadiusForCamera(object))

camera.location.z = 0
camera.location.y = 0
camera.location.x = sceneRadiusForCamera(object)
lamp.location = camera.location
pointCameraToTarget(camera, targetLoc)
filename = dir + "/image-02.jpg"
bpy.ops.render.render()
bpy.data.images[0].save_render(filename)
#print(object.bound_box)

#bpy.ops.wm.save_as_mainfile(meshname + '.blend')

bpy.ops.wm.save_as_mainfile(filepath="lapin.blend", check_existing=True, filter_blender=True, filter_backup=False, filter_image=False, filter_movie=False, filter_python=False, filter_font=False, filter_sound=False, filter_text=False, filter_btx=False, filter_collada=False, filter_folder=True, filemode=8, display_type='FILE_DEFAULTDISPLAY', compress=False, relative_remap=True, copy=False, use_mesh_compat=False)
for i in range(etapes - 1) :
    camera.location = (x, y, z)
    pointCameraToTarget(camera, targetLoc)
    

    #
    if i==1 :
    	print("Rendering image " + str(i + 1) + "...")
    	#bpy.ops.render.render()
    
    if i < 9 :
        filename = dir + "/image-0" + str(i + 1) + ".jpg"
    else :
        filename = dir + "/image-" + str(i + 1) + ".jpg"
    
    #if i==1 :
    	#bpy.data.images[0].save_render(filename)
    #if i == 0 :
    	#bpy.data.images[0].save_render(dir + "/image-72.jpg")
    #x2 = x * math.cos(angle) + y * math.sin(angle)
    #y2 = y * math.cos(angle) - x * math.sin(angle)
    #x = x2
    #y = y2
	
#bpy.ops.wm.collada_export(filepath = meshname + '.dae')