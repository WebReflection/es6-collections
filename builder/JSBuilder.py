# python builder by Andrea Giammarchi
# Mit Style License
# Note: this is not "extreme performances oriented" Python code
#       it should work on Python 2.6+ tho
import gzip, os, sys, string, re

# I know this sucks but it kinda worked cross .py version ... 
def fullPath(file):
    i = len(os.path.split(sys.argv[0])[-1:][0])
    return os.path.realpath(os.path.join(os.getcwd(), sys.argv[0][:-i], file))

# this could be surely optimized ...
def getSize(file):
    i = 0
    sufix = ['bytes', 'Kb', 'Mb']
    size = os.path.getsize(fullPath(file))
    while 1023.0 < size:
        size = size / 1024.0
        i = i + 1
    return str(round(size, 2)) + ' ' + sufix[i]

# this is a handy shortcut ...
def read(file):
    f = open(fullPath(file), 'r')
    content = f.read()
    f.close()
    return content

# ... as well as this one
def write(file, content):
    f = open(fullPath(file), 'w')
    f.write(content)
    f.close()

# utility
def replace(content, search, replace):
    for i in range(len(search)):
        content = string.replace(content, search[i], replace[i])
    return content

# well ... this simply works as well :-D
def compile(copyright, fullName, minName, files, search=None, replace=None):
    
    # create a copyright compatible with both YUICompressor and Google Closure Compiler
    multiCopyright = "\n".join([
        '/*!', copyright, '*/',
        '/**@license ' + copyright, '*/'
    ])
    
    #copy the list temporarely
    files = files[:]
    
    # read all files
    for i in range(len(files)):
        files[i] = read('../' + 'src/' + files[i])
    
    # address the whole content
    content = multiCopyright + "\n".join(files)
    files = [] # just in case ... 
    
    # replace something if necessary
    if search != None:
        content = replace(content, search, replace)
    
    # strip out code that should not be in the minified version
    cleanContent = re.sub(r'//\^[^\x00]*?//\$[^\n\r]+', '', content)
    
    # write the whole (cleaned) content
    write('../' + fullName, cleanContent)
    
    # MINIFY!
    
    # YUICompressor             [faster, less greedy, bigger size]
    os.system('java -jar "' + fullPath('jar/yuicompressor-2.4.6.jar') + '" --type=js "' + fullPath('../' + fullName) + '" -o "' + fullPath('../'  + minName) + '"')

    # Uglify JS                 [good performances, mediumly greedy, medium size]
    # os.system('java -jar "' + fullPath('jar/js.jar') + '" "' + fullPath('uglify-js/exec.js') + '" "' + fullPath('uglify-js/uglify.js') + '" "' + fullPath('../' + fullName) + '" "' + copyright + '" > "' + fullPath('../'  + minName) + '"')

    # Google Closure Compiler   [slowest, more greedy, smaller size]
    # os.system('java -jar "' + fullPath('jar/compiler.jar') + '" --compilation_level=SIMPLE_OPTIMIZATIONS --language_in ECMASCRIPT5_STRICT --js "' + fullPath('../' + fullName) + '" --js_output_file "' + fullPath('../'  + minName) + '"')
    
    # put back code that should have not been included in the minified version
    write('../' + fullName, content)
    
    # create the gzip version
    content = read('../' + minName)
    tmp = gzip.open(fullPath('../' + minName + '.gz'), 'w')
    tmp.write(content)
    tmp.close()
    
    # print out the result of all precedent operations
    print('Full size:       ' + getSize('../' + fullName))
    print('Minified size:   ' + getSize('../' + minName))
    print('Min + Gzip size: ' + getSize('../' + minName + '.gz'))
    
    # remove the gzipped version
    os.remove(fullPath('../' + minName + '.gz'))
