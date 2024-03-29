import {VideoToMobileOverlayCommand, Command, ExtensionToVideoCommand, Message} from '@project/common';

export default class VideoToOverlayForwardingHandler {
    get sender() {
        return 'asbplayer-video-to-mobile-overlay';
    }

    get command() {
        return null;
    }

    handle(
        command: Command<Message>,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response?: any) => void
    ) {
        const videoToOverlayCommand = command as VideoToMobileOverlayCommand<Message>;


        console.debug("VideoToOverlayForwardingHandler forwarding message:", videoToOverlayCommand);
        chrome.tabs.sendMessage(sender.tab!.id!, videoToOverlayCommand);
        return false;
    }
}
