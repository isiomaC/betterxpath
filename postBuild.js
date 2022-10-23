import fs from 'fs'

const parent = "./dist"

const manifestPath = `${parent}/manifest.json`

const assetsPath = `${parent}/assets`

const manifestV3Path = "./maniV3.json"

const updateFilesOrDirectory = (path) =>  {

    const isDir = fs.lstatSync(path).isDirectory() 
    const isFile = fs.lstatSync(path).isFile() 
   
    if (isDir) {
        try{
            let dir = fs.readdirSync(path)
        
            const indexPage = dir.find((item) => item.includes("index") && item.includes("js"))
    
            const newContentScriptName = dir.find((item) => item.includes("contentScript"))
    
            const newChromeChangeBgName = dir.find((item) => item.includes("chromeChangeBg"))
    
            // const newCsPath = "/assets/" + contentScriptName
    
            // const newChangeBgPath = "/assets/" + chromeChangeBgName
    
            let file = fs.readFileSync(`${assetsPath}/${indexPage}`)
    
            const contentScriptSearch = newContentScriptName.split('.')[0]
    
            const chromeChangeSearch = newChromeChangeBgName.split('.')[0]
    
            file = file.toString()
    
            file = file.replace(new RegExp(`${contentScriptSearch}.js`, 'u'), `${newContentScriptName}`)
    
            file = file.replace(new RegExp(`${chromeChangeSearch}.js`, 'u'), `${newChromeChangeBgName}`)
    
            fs.writeFile(`${assetsPath}/${indexPage}`, file, 'utf8', (err) => {
                if (err) throw err;
                console.log('directory files updated');
            });
        }catch(e){
            console.log("[DIRECTORY UPDATE FAILED]\t", e)
        }
    }

    if (isFile) {

        try{
            const maniJson = JSON.parse(fs.readFileSync(path))

            const maniV3 = JSON.parse(fs.readFileSync(manifestV3Path))
    
            const mergedManifest = {
                ...maniV3,
                ...maniJson
            }
    
            const getNewBackgroundName = () => {
                let dir = fs.readdirSync(assetsPath)
                let background = dir.find((item) => item.includes('background'))
                return "/assets/"+background
            }
    
            //update background 
            mergedManifest.background.service_worker = getNewBackgroundName()
    
            fs.writeFile(manifestPath, JSON.stringify(mergedManifest, 0, 4), 'utf8', (err) => {
                if (err) throw err;
                console.log('manifest.json updated');
            });
        }catch(e){
            console.log("[MANIFEST UPDATE FAILED]\t", e)
        }
    }

}
 

const setIcon = () => {
    try{
        let src = './29.png'
        let dest = `${parent}/assets/29.png`

        fs.copyFile(src, dest, (err) => {
            if (err) throw err;
            console.log('icon updated');
        });

    }catch(e){
        console.log(e)
    }
}

updateFilesOrDirectory(assetsPath)

updateFilesOrDirectory(manifestPath)

setIcon()