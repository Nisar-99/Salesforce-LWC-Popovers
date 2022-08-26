import {  
    SLDS_POPOVER_CLASS, 
    POPOVER_SIZES, 
    VARIANTS, 
    NUBBIN_PLACEMENT, 
    NUBBIN_ADJUSTMENT, 
    NUBBIN_ADJUSTMENT_VARS, 
    POPOVER_TOGGGLE,
    CALC_FUNCTION
} from './constants'

const uniqueId = `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;
const popoverUniqueId = `popover${uniqueId}`;

const getVariant = (variant) => VARIANTS[variant?.toUpperCase()] ?? "" 
const getPopoverSize = (size) => POPOVER_SIZES[size?.toUpperCase()] ?? POPOVER_SIZES.MEDIUM; 

const getNubbinPlacement = (placement) => NUBBIN_PLACEMENT[placement?.toUpperCase()] ?? NUBBIN_PLACEMENT.DEFAULT ;

const nubbinAdjustmentClass = (placement) => NUBBIN_ADJUSTMENT[placement.toUpperCase()] ?? '';
const nubbinAdjustmentVars = (placement) => NUBBIN_ADJUSTMENT_VARS[placement.toUpperCase()] ?? '';

const popoverContainerClass = () => `${popoverUniqueId} popover_container`

const popoverClass = ( isShow = false ) => `popover ${POPOVER_TOGGGLE[isShow] ?? ''}`; 

const popoverSectionClass = ({placement, variant, size}) => 
    `${SLDS_POPOVER_CLASS} ${getNubbinPlacement(placement)} ${getVariant(variant)} ${getPopoverSize(size)}`  

const calcFunction = (placement) => CALC_FUNCTION[placement.toUpperCase()];

export { 
    popoverUniqueId, 
    popoverContainerClass, 
    popoverClass,  
    popoverSectionClass,  
    nubbinAdjustmentClass, 
    nubbinAdjustmentVars,
    calcFunction,
}