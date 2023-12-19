
const files=[
    "./content/topics/01.solenopsys.md",
    "./content/topics/solenopsys/01.ecosystem.md",
]

async function  concatFiles(input:string[],path:string){
    let promise =await Promise.all(input.map(async (f)=>{return  Bun.file(f).text()}));
    const out=promise.join("\n")
  //  console.log("OUT",out)
    Bun.write(path,out)
}

concatFiles(files,"./README.md")