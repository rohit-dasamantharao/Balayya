// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { TIMEOUT } from 'dns';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "balayya" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let balayya:any = null;
	let disposable = vscode.commands.registerCommand('balayya.jai', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		const DILOUGE = await vscode.window.showInputBox({
			placeHolder: "Dilouge",
			prompt: "Ask balayya to say somthing",
			value: "Jai balayya 💪💪!!!"
		  });

		runcommand();

		balayya = setInterval(()=>{runcommand();}, 20000);
		
		function runcommand()
		{
			vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
					title: DILOUGE
				},
				async progress => {
					function timeout(ms:number) {
						return new Promise(resolve => setTimeout(resolve, ms));
					}
					for(let i=0;i<100;i++){
						await timeout(50);
						progress.report({ increment: 1 });
					}
				}
			);
		}

		let disposable = vscode.commands.registerCommand('balayya.stop', async () => {
			if(balayya === null)
			{
				vscode.window.showInformationMessage("This is no balayya to stop");
			}
			else{
				clearInterval(balayya);
				balayya = null;
				vscode.window.showInformationMessage("balayya stopped");
			}
		});

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
