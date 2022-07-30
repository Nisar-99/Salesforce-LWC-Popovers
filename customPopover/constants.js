
const SLDS_POPOVER_CLASS = "slds-popover";

const POPOVER_SIZES = {
    SMALL  : "slds-popover_small",
    MEDIUM : "slds-popover_medium",
    LARGE  : "slds-popover_large"
};

const POPOVER_VARIANTS = {
    WARNING : "slds-popover_warning",
    ERROR   : "slds-popover_error",
    BRAND   : "slds-popover_brand",
    SUCCESS : "slds-popover_success",
    WALK    : "slds-popover_walkthrough"
};
const POPOVER_NUBBINS = {
    TOP    : "slds-nubbin--bottom",
    BOTTOM : "slds-nubbin--top",
    LEFT   : "slds-nubbin--right",
    RIGHT  : "slds-nubbin--left"
}
const POPOVER_UNIQUE_ID = `popover${ Date.now() + Math.floor(Math.random() * 100000000000000) }`;
const POPOVER_CONTAINER_CLASS = `${POPOVER_UNIQUE_ID} popover_container`;

const NUBBIN_PADDING = 14;

const CLOSE_BUTTON_VARIANT = ( variant )  => variant ? "inverse" : "";

const POPOVER_NUBBIN = (placement = "none") => `${SLDS_POPOVER_CLASS} ${POPOVER_NUBBINS[placement.toUpperCase()] || POPOVER_NUBBINS.TOP}`; 
const POPOVER_VARIANT = (variant = "none" ) => `${POPOVER_VARIANTS[variant.toUpperCase()] || ""}`;
const POPOVER_SIZE = (size = "medium") => `${POPOVER_SIZES[size.toUpperCase()] || POPOVER_SIZES.MEDIUM}`;

const NUBBIN_PLACEMENT = (placement, variant, size) => `${POPOVER_NUBBIN(placement, variant)} ${POPOVER_VARIANT(variant)} ${POPOVER_SIZE(size)}`;

export { NUBBIN_PLACEMENT, CLOSE_BUTTON_VARIANT, POPOVER_CONTAINER_CLASS, POPOVER_UNIQUE_ID, NUBBIN_PADDING };