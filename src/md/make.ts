const files = [
    "content/topics/solenopsys/01.ecosystem.md",
    "content/topics/solenopsys/ecosystem/01.problem.md",
    "content/topics/solenopsys/ecosystem/02.mission.md",
    "content/topics/solenopsys/ecosystem/03.marketplace.md",

    "content/topics/solenopsys/02.community.md",
    "content/topics/solenopsys/04.matrix..md",
    "content/topics/solenopsys/06.technologies.md",


    "content/topics/technologies/shockwaves/01.targets.md",
    "content/topics/technologies/shockwaves/02.advantages.md",
    "content/topics/technologies/shockwaves/02.clusterizing.md",
    "content/topics/technologies/shockwaves/03.architect.md",

    "content/topics/technologies/01.converged.md",
    "content/topics/technologies/02.shockwaves.md",
    "content/topics/technologies/03.combinatorics.md",
    "content/topics/technologies/converged/03.architect.md",





    "content/topics/technologies/combinatorics/01.conception.md",
    "content/topics/technologies/combinatorics/03.robots.md",
    "content/topics/technologies/combinatorics/04.principles.md",
    "content/topics/technologies/combinatorics/05.smart-modules.md",
    "content/topics/technologies/combinatorics/06.chips.md",



    "content/topics/solenopsys/tootls/01.meta-patent.md",
    "content/topics/solenopsys/tootls/02.meta-ip.md",







    "content/topics/solenopsys/finance/01.token.md",
    "content/topics/solenopsys/finance/02.smartcontracts.md",
    "content/topics/solenopsys/finance/03.microfunds.md",
    "content/topics/solenopsys/finance/04.exchange.md",
    "content/topics/solenopsys/finance/05.market-makers.md",
    "content/topics/solenopsys/finance/06.gateways.md",

    "content/topics/solenopsys/documentation/converged/01.control.md",
    "content/topics/solenopsys/matrix/02.connectors.md",

]


async function concatFiles(input: string[], path: string) {
    let promise = await Promise.all(input.map(async (f) => {
        const name =  '\n<span style=\"color:red;\">'+f+'</span>\n'

        return name + await Bun.file(f).text()
    }));
    const out = promise.join("\n")
    //  console.log("OUT",out)
    Bun.write(path, out.replaceAll("../images", "../content/images").replaceAll("../", "./"))
}



concatFiles(files, "./README.md")