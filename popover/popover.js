import { LightningElement, api } from 'lwc';
import { 
    popoverContainerClass, 
    popoverClass,  
    popoverSectionClass, 
    nubbinAdjustmentClass, 
    nubbinAdjustmentVars,
    calcFunction
} from './helper';
import { PLACEMENT } from './constants'
export default class Popover extends LightningElement {

    @api size;
    @api variant;
    @api placement = PLACEMENT.TOP;
    @api withClose = false;
 
    popoverClass = popoverClass();

    get popoverContainerClass (){
        return `${popoverContainerClass()} ${this.nubbinAdjustmentClass ?? ''} `;
    } 

    get popoverSectionClass() { 
        return popoverSectionClass(this) 
    };
    get closeIconVariant () { 
        return this.variant ? "inverse":"";
    };
    get showPopover() {};
    set showPopover(value) {
        this.popoverClass = popoverClass(value);
    }

    hasHeader = false;
    hasBody = true;
    hasFooter = true;

    hasRendered = false;

    renderedCallback() {
      if (this.hasRendered) return;
  
      this.hasRendered = true;
      this.handleSlot();
    }

    handleSlot() {
        [...this.template.querySelectorAll('slot')].forEach(slot => {
            const hasSlotValue = slot.assignedElements().length !== 0 && slot.outerText.length !== 0;
            this[`has${slot.name.toLowerCase().charAt(0).toUpperCase()}`] = hasSlotValue;
        });
    }

    handleMouseOverOrFocusElement(event) {
        event.stopPropagation();
        this.handlePopoverShow();
    }
  
    handleMouseLeaveOrBlurElement(event) {
        event.stopPropagation();
        this.tooglePopover = false;
        this.handlePopoverHide();
    }

    handleLinkClick(event) {
        event.stopPropagation();
        this.tooglePopover = !(this.tooglePopover ?? false); 
        this.tooglePopover && (this.tooglePopover = this.handlePopoverShow()) || this.handlePopoverHide();
    }

    handlePopoverClose() {
        this.showPopover = false ;
    }

    handlePopoverShow() {
        const  {  popoverXPos, popoverYPos } = this.calculatePopoverPosition();
        const style = document.body.style;

        style.setProperty('--popover-x-pos', `${popoverXPos}px`);
		style.setProperty('--popover-y-pos', `${popoverYPos}px`);

        this.showPopover = true;
        return true;
    }
    handlePopoverHide() {
        !this.withClose && ( this.showPopover = false )
    }
  
    calculatePopoverPosition() {
        const containerRect = this.template.querySelector(".popover_container").getBoundingClientRect();
        const popoverRect = this.template.querySelector(".popover").getBoundingClientRect();

        const placement = this.calcPlacement( containerRect, popoverRect, this );

        const { popoverXPos, popoverYPos, adjustment } = this[calcFunction(placement)](containerRect, popoverRect, placement) ?? {};

        adjustment && ( this.handleNubbinAdjustmentClass( adjustment, placement ) );

        return { popoverXPos, popoverYPos}
    }
    calcPlacement( { top, right, left, bottom }, { width, height }, { placement }) {

        if ( placement === PLACEMENT.TOP && top - height < 0 ) return PLACEMENT.BOTTOM; 
        if ( placement === PLACEMENT.LEFT && left - width < 0 ) return PLACEMENT.RIGHT; 

        if ( placement === PLACEMENT.RIGHT && right + width > window.innerWidth ) return PLACEMENT.LEFT; 
        if ( placement === PLACEMENT.BOTTOM && bottom + height > window.innerHeight ) return PLACEMENT.TOP;

        return placement;
    }
    calcHorizontal({ width:containerWidth, height:containerHeight, top:containerTop}, {height:popoverHeight, width:popoverWidth}, placement) {
        const nubbinPadding = 14;

        const midHeight = (containerHeight - popoverHeight) / 2;
        const width = placement === PLACEMENT.LEFT ? containerWidth : popoverWidth + nubbinPadding;

        const adjustment = popoverHeight > window.innerHeight ? midHeight - containerTop - 10:0;

        const popoverXPos = width * ( placement === PLACEMENT.RIGHT? -1:1);
        const popoverYPos = adjustment || midHeight;

        return { popoverXPos, popoverYPos, adjustment };
    }
    calcVertical({ width:containerWidth, height:containerHeight,left:containerLeft, right:containerRight }, {height:popoverHeight, width:popoverWidth}, placement) {
        const nubbinPadding = 14;

        const height = placement === PLACEMENT.BOTTOM ? containerHeight : popoverHeight + nubbinPadding;
        const popoverYPos = height * (placement === PLACEMENT.TOP ? -1:1);

        let midWidth = (containerWidth - popoverWidth) / 2;
        let adjustment = 0;

        if ( containerLeft + midWidth < 4) {
            adjustment = Math.abs(containerLeft + midWidth) + 4;
            midWidth += adjustment;
            adjustment *= -1;
        } else if (  containerRight + Math.abs(midWidth) > window.innerWidth - 4) {
            adjustment = containerRight + Math.abs(midWidth) - (window.innerWidth - 20);
            midWidth -= adjustment;
        }
        const popoverXPos = midWidth;
        return { popoverXPos, popoverYPos, adjustment };
    }
    handleNubbinAdjustmentClass( adjustment, placement ) {

        const style = document.body.style;

        style.setProperty(`${nubbinAdjustmentVars(placement)}`,`${adjustment}px`);
        this.nubbinAdjustmentClass = nubbinAdjustmentClass(placement); 

        return true;
    }
}