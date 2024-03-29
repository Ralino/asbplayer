import { MobileOverlayToVideoCommand, Command, ExtensionToVideoCommand, Message} from '@project/common';

export default class OverlayToVideoForwardingHandler {
    get sender() {
        return 'asbplayer-mobile-overlay-to-video';
    }

    get command() {
        return null;
    }

    handle(
        command: Command<Message>,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response?: any) => void
    ) {
        const overlayToVideoCommand = command as MobileOverlayToVideoCommand<Message>;

        if (overlayToVideoCommand.message.command === 'request-mobile-overlay-model') {
            const extensionToVideoCommand: MobileOverlayToVideoCommand<Message> = {
                sender: 'asbplayer-mobile-overlay-to-video',
                message: overlayToVideoCommand.message,
                src: overlayToVideoCommand.src,
            };

            console.debug("OverlayToVideoForwardingHandler forwarding message with response:", extensionToVideoCommand);
            chrome.tabs.sendMessage(sender.tab!.id!, extensionToVideoCommand)
                .then(sendResponse);
            return true;
        } else {
            const extensionToVideoCommand: ExtensionToVideoCommand<Message> = {
                sender: 'asbplayer-extension-to-video',
                message: overlayToVideoCommand.message,
                src: overlayToVideoCommand.src,
            };

            console.debug("OverlayToVideoForwardingHandler forwarding message:", extensionToVideoCommand);
            chrome.tabs.sendMessage(sender.tab!.id!, extensionToVideoCommand);
            return false;
        }
    }
}
