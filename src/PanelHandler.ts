/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

export class PanelHandler {
	private static instance: PanelHandler;
	private createTemplate: (name: string) => void = () => {};
	private editTemplate: (name: string, enabled: boolean, new_name: string|null, display_name: string, type: "Game" | "Lobby" | "Builder" | "Developer", maintained: boolean, max_players: number, players_min_percent: number, players_max_percent: number) => void = () => {};
	private deleteTemplate: (name: string) => void = () => {};

	private startServer: (template: string) => void = () => {};
	private stopServer: (identifier: string) => void = () => {};

	getInstance(): PanelHandler {
		if (!PanelHandler.instance) PanelHandler.instance = new PanelHandler();
		return PanelHandler.instance;
	}
}