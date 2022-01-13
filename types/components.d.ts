import { DefineComponent } from "vue";
import { ColorModifiers, DaysOfWeek, GlobalPositions } from "./helpers";

export declare type FloatsConfig = {
    defaultContainerElement?: string,
    defaultIconPack?: string;
    defaultIconComponent?: string;
    defaultIconPrev?: string;
    defaultIconNext?: string;
    defaultLocale?: undefined | string | string[],
    defaultDialogConfirmText?: string;
    defaultDialogCancelText?: string;
    defaultSnackbarDuration?: number;
    defaultSnackbarPosition?: GlobalPositions;
    defaultToastDuration?: number;
    defaultToastPosition?: GlobalPositions;
    defaultNotificationDuration?: number;
    defaultNotificationPosition?: GlobalPositions;
    defaultTooltipType?: ColorModifiers;
    defaultTooltipAnimated?: boolean;
    defaultTooltipDelay?: number;
    defaultSidebarDelay?: number,
    defaultInputAutocomplete?: string;
    defaultDateFormatter?: Function;
    defaultDateParser?: Function;
    defaultDateCreator?: Function;
    defaultDayNames?: string[];
    defaultMonthNames?: string[];
    defaultFirstDayOfWeek?: DaysOfWeek;
    defaultUnselectableDaysOfWeek?: number[];
    defaultTimeFormatter?: Function;
    defaultTimeParser?: Function;
    defaultModalCanCancel?: string[];
    defaultModalScroll?: string;
    defaultDatepickerMobileNative?: boolean;
    defaultTimepickerMobileNative?: boolean;
    defaultNoticeQueue?: boolean;
    defaultInputHasCounter?: boolean;
    defaultTaginputHasCounter?: boolean;
    defaultUseHtml5Validation?: boolean;
    defaultDropdownMobileModal?: boolean;
    defaultFieldLabelPosition?: 'inside' | 'on-border';
    defaultDatepickerYearsRange?: number[];
    defaultDatepickerNearbyMonthDays?: boolean;
    defaultDatepickerNearbySelectableMonthDays?: boolean;
    defaultDatepickerShowWeekNumber?: boolean;
    defaultClockpickerHoursLabel?: string;
    defaultClockpickerMinutesLabel?: string;
    defaultTrapFocus?: boolean;
    defaultButtonRounded?: boolean;
    defaultSwitchRounded?: boolean;
    defaultCarouselInterval?: number;
    defaultTabsExpanded?: boolean;
    defaultTabsAnimated?: boolean;
    defaultTabsType?: string;
    defaultLinkTags?: string[];
    defaultImageWebpFallback?: string,
    defaultImageLazy?: boolean,
    defaultImageResponsive?: boolean,
    defaultImageRatio?: string,
    defaultImageSrcsetFormatter?: Function,
    customIconPacks?: any;
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
