import { Component, DefineComponent } from "vue";
import { ColorModifiers, GlobalPositions } from "./helpers";

export declare type FloatsConfig = {
    defaultType?: string,
    defaultToastDuration?: number;
    defaultToastPosition?: GlobalPositions;
};

export declare type FNoticeConfig = {
    message: string | any[];
    type?: ColorModifiers;
    position?: GlobalPositions;
    duration?: number;
    indefinite?: boolean;
    pauseOnHover?: boolean;
    container?: string;
    queue?: boolean;
}

export declare type FDialogConfig<T> = {
    title: string,
    okText?: string,
    cancelText?: string,
    component: Component,
    defaultResult: T,
    okVisible?: boolean,
    cancelVisible?: boolean,
    onOkPressed?: (result: T) => void | Promise<void> | null,
    onCancelPressed?: Function,
    isFullScreen?: boolean,
    isSheet?: boolean,
    props?: any,
}

export declare const ToastProgrammatic: {
    open: (params: FNoticeConfig | string) => DefineComponent;
}

export declare const AlertProgrammatic: {
    open: <T>(params: FDialogConfig<T> | string) => DefineComponent;
}
