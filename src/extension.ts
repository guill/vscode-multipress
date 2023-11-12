// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "multipress" is now active!');
	
	let lastKey: string = '';
	let lastTime: number = 0;
	
	interface MultipressArgs {
		key: string;
		timeout: number;
		command: string;
		extra: any;
	}
	
	let handleMultipress = async (args: MultipressArgs): Promise<void> => {
		const now = new Date().getTime();
		if (args.key === lastKey && now - lastTime < args.timeout) {
			// console.log('Multipress detected');
			lastKey = '';
			lastTime = 0;
			await vscode.commands.executeCommand("deleteLeft");
			await vscode.commands.executeCommand(args.command, args.extra);
		} else {
			lastKey = args.key;
			lastTime = now;
			await vscode.commands.executeCommand("type", { text: args.key });
		}
	};

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('multipress.trigger', handleMultipress));
}

// This method is called when your extension is deactivated
export function deactivate() {}
