import { IPlugin, IMessage, ChannelType, IContainer } from './types';

export abstract class Plugin implements IPlugin {
  public abstract container: IContainer;

  public abstract get name(): string;

  public abstract get description(): string;

  public abstract get usage(): string;

  public abstract get permission(): ChannelType;

  public validate(message: IMessage, args: string[]) {
    return true;
  }

  public hasPermission(message: IMessage): boolean {
    const channelName = this.container.messageService.getChannel(message).name;
    return this.container.channelService.hasPermission(channelName, this.permission);
  }

  public abstract async execute(message: IMessage): Promise<void>;
}
