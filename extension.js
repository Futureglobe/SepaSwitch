const vscode = require('vscode');

function activate(context) 
{
    context.subscriptions.push(vscode.commands.registerCommand("extension.switchSeperator", async () => 
    {
        try 
        { 
            vscode.window.showInputBox({ placeHolder: "Enter the new separator you want to use" })
            .then(value => 
            {
                if(value !== undefined && value !== "")
                {
                    updateSeperator(value);
                }
                else if(value === "")
                {
                    vscode.window.showInformationMessage("[SepaSwitch] New separator cannot be empty");
                }
            });
        }
        catch (error) 
        {
            vscode.window.showErrorMessage("[SepaSwitch] An error occurred: " + error);
        }
    }));
}

function updateSeperator(sepChar) 
{
    try 
    {
        const currentDocument = vscode.window.activeTextEditor.document;
        const configuration = vscode.workspace.getConfiguration('', currentDocument.uri);
        // const target = vscode.workspace.workspaceFolders ? vscode.ConfigurationTarget.WorkspaceFolder : vscode.ConfigurationTarget.Global;
        const target = vscode.ConfigurationTarget.Global;
        configuration.update("csv-preview.separator", sepChar, target);
        vscode.window.showInformationMessage("Separator changed to: " + sepChar);
    } 
    catch (error) 
    {
        var documentOpen = vscode.window.activeTextEditor;
        if(documentOpen === undefined || documentOpen === null)
        {
            vscode.window.showErrorMessage("[SepaSwitch] You need to open a file first!");
        }
        else 
        {
            vscode.window.showErrorMessage("[SepaSwitch] Error: " + error);
        }
    }
}
exports.activate = activate;
exports.updateSeperator = updateSeperator;
// this method is called when your extension is deactivated
function deactivate() 
{

}
exports.deactivate = deactivate;