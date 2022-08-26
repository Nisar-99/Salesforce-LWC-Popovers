
const SLDS_POPOVER_CLASS = "slds-popover";
const POPOVER_SIZES = {
  SMALL  : "slds-popover_small",
  MEDIUM : "slds-popover_medium",
  LARGE  : "slds-popover_large"
};

const VARIANTS = {
  WARNING : "slds-popover_warning",
  ERROR   : "slds-popover_error",
  BRAND   : "slds-popover_brand",
  SUCCESS : "slds-popover_success",
  WALK    : "slds-popover_walkthrough",
  WALKALT : "slds-popover_walkthrough slds-popover_walkthrough-alt" 
};

const PLACEMENT = {
    AUTO   : "auto",
    TOP    : "top",
    LEFT   : "left",
    RIGHT  : "right",
    BOTTOM : "bottom"
}
const RELATIONS = {
    TOP    : "bottom",
    LEFT   : "right",
    RIGHT  : "left",
    BOTTOM : "top"
}
const NUBBIN_PLACEMENT = {
    TOP     : `slds-nubbin--${RELATIONS.TOP}`,
    RIGHT   : `slds-nubbin--${RELATIONS.RIGHT}`,
    LEFT    : `slds-nubbin--${RELATIONS.LEFT}`,
    BOTTOM  : `slds-nubbin--${RELATIONS.BOTTOM}`,
    DEFAULT : `slds-nubbin--${RELATIONS.TOP}`
} 
const NUBBIN_ADJUSTMENT = {
    TOP     : `nubbin-adjustment--${RELATIONS.TOP}`,
    RIGHT   : `nubbin-adjustment--${RELATIONS.RIGHT}`,
    LEFT    : `nubbin-adjustmnet--${RELATIONS.LEFT}`,
    BOTTOM  : `nubbin-adjustmnet--${RELATIONS.BOTTOM}`
}
const NUBBIN_ADJUSTMENT_VARS = {
    TOP     : `--adjustment-${RELATIONS.TOP}`,
    RIGHT   : `--adjustment-${RELATIONS.RIGHT}`,
    LEFT    : `--adjustmnet-${RELATIONS.LEFT}`,
    BOTTOM  : `--adjustmnet-${RELATIONS.BOTTOM}`
}
const POPOVER_TOGGGLE = { 
    true: 'popover-show',
    false: 'popover-hide'
}
const CALC_FUNCTION = {
    TOP    : 'calcVertical',
    RIGHT  : 'calcHorizontal',
    LEFT   : 'calcHorizontal',
    BOTTOM : 'calcVertical',
}

export { 
    SLDS_POPOVER_CLASS, 
    POPOVER_SIZES, 
    VARIANTS, 
    PLACEMENT,
    NUBBIN_PLACEMENT, 
    NUBBIN_ADJUSTMENT,
    NUBBIN_ADJUSTMENT_VARS,
    POPOVER_TOGGGLE, 
    CALC_FUNCTION
};