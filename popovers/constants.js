
const SLDS_POPOVER_CLASS = "slds-popover";
const POPOVER_SIZES = new Proxy({
  SMALL  : "slds-popover_small",
  MEDIUM : "slds-popover_medium",
  LARGE  : "slds-popover_large"
}, {
    get: (target, prop) => target[prop.toUpperCase()]
});

const VARIANTS = new Proxy ({
  WARNING : "slds-popover_warning",
  ERROR   : "slds-popover_error",
  BRAND   : "slds-popover_brand",
  SUCCESS : "slds-popover_success",
  WALK    : "slds-popover_walkthrough",
  WALKALT : "slds-popover_walkthrough slds-popover_walkthrough-alt" 
}, {
    get: (target, prop) => target[prop.toUpperCase()]
});

const PLACEMENT = new Proxy ({
    AUTO   : "auto",
    TOP    : "top",
    LEFT   : "left",
    RIGHT  : "right",
    BOTTOM : "bottom"
}, {
    get: (target, prop) => target[prop.toUpperCase()]
});
const RELATIONS = new Proxy ({
    TOP    : "bottom",
    LEFT   : "right",
    RIGHT  : "left",
    BOTTOM : "top"
}, {
    get: (target, prop) => target[prop.toUpperCase()]
});
const NUBBIN_PLACEMENT = new Proxy ({
    TOP     : `slds-nubbin--${RELATIONS.TOP}`,
    RIGHT   : `slds-nubbin--${RELATIONS.RIGHT}`,
    LEFT    : `slds-nubbin--${RELATIONS.LEFT}`,
    BOTTOM  : `slds-nubbin--${RELATIONS.BOTTOM}`,
    DEFAULT : `slds-nubbin--${RELATIONS.TOP}`
}, {
    get: (target, prop) => target[prop.toUpperCase()]
});
const NUBBIN_ADJUSTMENT = new Proxy ({
    TOP     : `nubbin-adjustment--${RELATIONS.TOP}`,
    RIGHT   : `nubbin-adjustment--${RELATIONS.RIGHT}`,
    LEFT    : `nubbin-adjustmnet--${RELATIONS.LEFT}`,
    BOTTOM  : `nubbin-adjustmnet--${RELATIONS.BOTTOM}`
}, {
    get: (target, prop) => target[prop.toUpperCase()]
});
const NUBBIN_ADJUSTMENT_VARS = new Proxy ({
    TOP     : `--adjustment-${RELATIONS.TOP}`,
    RIGHT   : `--adjustment-${RELATIONS.RIGHT}`,
    LEFT    : `--adjustmnet-${RELATIONS.LEFT}`,
    BOTTOM  : `--adjustmnet-${RELATIONS.BOTTOM}`
}, {
    get: (target, prop) => target[prop.toUpperCase()]
});
const POPOVER_TOGGGLE = { 
    true: 'popover-show',
    false: 'popover-hide'
}
const CALC_FUNCTION = new Proxy ({
    TOP    : 'calcVertical',
    RIGHT  : 'calcHorizontal',
    LEFT   : 'calcHorizontal',
    BOTTOM : 'calcVertical',
}, {
    get: (target, prop) => target[prop.toUpperCase()]
});

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