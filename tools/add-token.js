const { unused, isEmpty, generateUUID, colors } = require("svcorelib");
const fs = require("fs-extra");
const settings = require("../settings");

try
{
    let amount;

    try
    {
        amount = parseInt(process.argv[2].replace(/[-]/g, ""));
    }
    catch(err)
    {
        unused(err);
        amount = 1;
    }

    console.log("\n");

    for(let i = 0; i < amount; i++)
    {
        const tok = generateUUID.alphanumerical("xxxxyyyyxxxxyyyy_xxxxyyyyxxxxyyyy_xxxxyyyyxxxxyyyy_xxxxyyyyxxxxyyyy");

        let oldFile = [];
        if(fs.existsSync(settings.auth.tokenListFile))
        {
            const fCont = fs.readFileSync(settings.auth.tokenListFile).toString();
            if(!isEmpty(fCont))
                oldFile = JSON.parse(fCont);
            else
                oldFile = [];
        }

        oldFile.push({
            token: tok,
            maxReqs: null // null = default
        });

        fs.writeFileSync(settings.auth.tokenListFile, JSON.stringify(oldFile, null, 4));

        console.log(`Token ${colors.fg.green}${tok}${colors.rst} added to the list of tokens at "${settings.auth.tokenListFile}".`);
    }

    console.log("\n\n");
    return process.exit(0);
}
catch(err)
{
    return process.exit(1);
}
