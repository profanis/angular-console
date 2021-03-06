import { TreeItem } from 'vscode';

import { AbstractTreeProvider } from '../abstract-tree-provider';
import { ROUTE_LIST, WorkspaceTreeItem } from './workspace-tree-item';

const SCANNING_FOR_WORKSPACE = new TreeItem(
  'Scanning for your Angular Workspace...'
);
export const LOCATE_YOUR_WORKSPACE = new TreeItem('Select workspace json');
LOCATE_YOUR_WORKSPACE.command = {
  tooltip: 'Select an workspace json file to open',
  title: 'Select workspace json',
  command: 'nxConsole.selectWorkspaceManually'
};
export const CHANGE_WORKSPACE = new TreeItem('Change workspace');
CHANGE_WORKSPACE.command = {
  tooltip: 'Select an workspace json file to open',
  title: 'Change workspace',
  command: 'nxConsole.selectWorkspaceManually'
};

export class WorkspaceTreeProvider extends AbstractTreeProvider<
  WorkspaceTreeItem | TreeItem
> {
  static create(config: {
    workspaceJsonPath?: string;
    extensionPath: string;
  }): WorkspaceTreeProvider {
    return new WorkspaceTreeProvider(
      config.workspaceJsonPath,
      config.extensionPath
    );
  }

  private scanning = Boolean(this.workspaceJsonPath);

  private constructor(
    public workspaceJsonPath: string | undefined,
    readonly extensionPath: string
  ) {
    super();
  }

  getParent(_: WorkspaceTreeItem) {
    return null;
  }

  endScan() {
    this.scanning = false;
    this.refresh();
  }

  setWorkspaceJsonPath(workspaceJsonPath: string) {
    this.workspaceJsonPath = workspaceJsonPath;
    this.refresh();
  }

  getChildren() {
    const workspaceJsonPath = this.workspaceJsonPath;

    if (!workspaceJsonPath) {
      if (this.scanning) {
        return [SCANNING_FOR_WORKSPACE];
      } else {
        return [LOCATE_YOUR_WORKSPACE];
      }
    }

    return [
      ...ROUTE_LIST.map(
        route =>
          new WorkspaceTreeItem(workspaceJsonPath, route, this.extensionPath)
      ),
      CHANGE_WORKSPACE
    ];
  }
}
