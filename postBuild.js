import fs from 'fs'


//------ Pre build files
const cotentScriptsPath = './src/scripts/content-scripts'
//----


const parent = "./dist"

const manifestPath = `${parent}/manifest.json`

const assetsPath = `${parent}/assets`

const manifestV3Path = "./maniV3.json"



const updateManifestJson = (path) =>  {

    const isFile = fs.lstatSync(path).isFile() 

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


const updateIndexFile = (path) => {
    const isDir = fs.lstatSync(path).isDirectory() 

    const getPostBuildIndexPage = (indexPages, scriptName) => {
        for (let name of indexPages){
            
            let fileString = fs.readFileSync(`${assetsPath}/${name}`).toString()

            if (fileString.includes(scriptName)){
                return [name, fileString]
            }
        }
        return []
    }
   
    if (isDir) {
        try{

            //Update fetch file from content-script directory and use a loop make robust

            const indexPages = fs.readdirSync(assetsPath).filter((item) => item.includes("index") && item.includes("js"))

            let indexPageName = ''

            let preBuildScripts = fs.readdirSync(cotentScriptsPath)

            let pageName, pageContent

            let index = 0 

            for( let scriptName of preBuildScripts){
                let dir = fs.readdirSync(path)

                const [name, ext] = scriptName.split('.')

                const scriptNamePostBuild = dir.find((item) => item.includes(name) && item.includes(ext))

                if (index === 0){

                    [pageName, pageContent] = getPostBuildIndexPage(indexPages, scriptName)

                    if (pageName === undefined || pageContent === undefined){
                        console.log("Directory already Updated")
                        return
                    }
                    indexPageName = pageName
                }

                pageContent = pageContent.replace(new RegExp(`${scriptName}`, 'u'), `${scriptNamePostBuild}`)
                index++
            }

            fs.writeFile(`${assetsPath}/${indexPageName}`, pageContent, 'utf8', (err) => {
                if (err) throw err;
                console.log('directory files updated');
            });
            
        
            // const indexPage = dir.find((item) => item.includes("index") && item.includes("js"))
    
            // const newContentScriptName = dir.find((item) => item.includes("contentScript"))
    
            // const newChromeChangeBgName = dir.find((item) => item.includes("chromeChangeBg"))

            // const newtrackMouseName = dir.find((item) => item.includes("trackMouse"))
    
            // // const newCsPath = "/assets/" + contentScriptName
    
            // // const newChangeBgPath = "/assets/" + chromeChangeBgName
    
            // let file = fs.readFileSync(`${assetsPath}/${indexPage}`)
    
            // const contentScriptSearch = newContentScriptName.split('.')[0]
    
            // const chromeChangeSearch = newChromeChangeBgName.split('.')[0]

            // const trackMouseSearch = newtrackMouseName.split('.')[0]
    
            // file = file.toString()
    
            // file = file.replace(new RegExp(`${contentScriptSearch}.js`, 'u'), `${newContentScriptName}`)
    
            // file = file.replace(new RegExp(`${chromeChangeSearch}.js`, 'u'), `${newChromeChangeBgName}`)

            // file = file.replace(new RegExp(`${trackMouseSearch}.js`, 'u'), `${newtrackMouseName}`)
    
           
        }catch(e){
            console.log("[DIRECTORY UPDATE FAILED]\t", e)
        }
    }
}


const updateBackgroundJs = () => {

    try{
        let oldTestCssFileName = "testCss"

        const isDir = fs.lstatSync(assetsPath).isDirectory() 
    
        if (!isDir){
            return 
        }
    
        const background = fs.readdirSync(assetsPath).find((item) => item.includes("background"))
    
        const newTestCssFileName = fs.readdirSync(assetsPath).find((item) => item.includes(oldTestCssFileName))

        const cleanNewTestCssFileName = newTestCssFileName.split('.').filter((item => !item.includes('css'))).join('.')

        let fileString = fs.readFileSync(`${assetsPath}/${background}`).toString()

        const exists = fileString.search(new RegExp(`${newTestCssFileName}`))

        if (exists !== -1){
            return
        }
    
        let newPageContent = fileString.replace(new RegExp(`${oldTestCssFileName}`, 'u'), `${cleanNewTestCssFileName}`)
    
        fs.writeFile(`${assetsPath}/${background}`, newPageContent, 'utf8', (err) => {
            if (err) throw err;
            console.log('background css file updated');
        });
        
    }catch(e){
        console.log("[BACKGROUND SCRIP UPDATE FAILED]\t", e)
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


updateBackgroundJs()

updateIndexFile(assetsPath)

updateManifestJson(manifestPath)

setIcon()