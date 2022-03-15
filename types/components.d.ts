import { DefineComponent } from "vue";
import { ColorModifiers, GlobalPositions } from "./helpers";

export declare type FloatsConfig = {
    defaultType?: string,
    defaultToastDuration?: number;
    defaultToastPosition?: GlobalPositions;
};

export declare type FNoticeConfig = {
    /**
    * Message text
    */
    message: string | any[];

    /**
    * Type (color)
    */
    type?: ColorModifiers;

    /**
    * Which position it will appear
    */
    position?: GlobalPositions;

    /**
    * Visibility duration in milliseconds
    */
    duration?: number;

    /**
     * Show indefinitely until it is dismissed
     */
    indefinite?: boolean;

    /**
     * Prevent the notice from hiding while it is being hovered.
     */
    pauseOnHover?: boolean;

    /**
    * DOM element it will be created on.
    * Note that this also changes the position of the element from fixed
    * to absolute. Meaning that the container should be fixed.
    */
    container?: string;

    /**
    * disable queue
    */
    queue?: boolean;
}

export declare const ToastProgrammatic: {
    open: (params: FNoticeConfig | string) => DefineComponent;
}

export declare const AlertProgrammatic: {
    open: (params: FNoticeConfig | string) => DefineComponent;
}
