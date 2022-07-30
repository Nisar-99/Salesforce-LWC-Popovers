import { LightningElement, api } from 'lwc';
import { NUBBIN_PLACEMENT, CLOSE_BUTTON_VARIANT, POPOVER_CONTAINER_CLASS, POPOVER_UNIQUE_ID, NUBBIN_PADDING } from './constants';
export default class CuostomPopover extends LightningElement {
    @api size;
    @api placement;
    @api variant;
    @api withClose = false;

    popoverContainerClass = POPOVER_CONTAINER_CLASS;
    nubbinPlacement = NUBBIN_PLACEMENT(this.placement, this.variant, this.size);
    closeButtonVariant = CLOSE_BUTTON_VARIANT(this.variant);

    hasHeader = false;
    hasFooter = false;
    hasBody = false;

    popoverStyle = "";

    connectedCallback() { 
        this.handleSlot();
    }
    handleSlot() {
        [...this.template.querySelectorAll('slot')].forEach(slot => {
            const hasSlotValue = slot.assignedElements().length !== 0 && slot.outerText.length !== 0;
            this[`has${slot.name.toLowerCase().charAt(0).toUpperCase()}`] = hasSlotValue;
        });
    }
    handleMouseLeaveOrBlurElement(e) {
      	e.stopPropagation();
      	!this.withClose && ( this.popoverStyle = "popover_hidden" );
	}
	handleMouseOverOrFocusElement(event) {
		event.stopPropagation();
		
  	  	const { popoverXPos, popoverYPos } = this.calculatePopoverPosition(event);
		const style = document.documentElement.style;

		style.setProperty('--popover-x-pos', `${popoverXPos}px`);
		style.setProperty('--popover-y-pos', `${popoverYPos}px`);

  	    this.popoverStyle ="popover_show";
  	}
	calculatePopoverPosition() {
		const popoverRect = this.template.querySelector(".popover").getBoundingClientRect();
		const containerRect = this.template.querySelector(".popover_container").getBoundingClientRect();
		const windowRect = { top:0, right: window.innerWidth, bottom: window.innerHeight, left: 0 };

		return { popoverXPos: 0, popoverYPos:0, popoverWidth:0, popoverHeight:0 };
    }
	calcRight(popoverRect, containerRect, windowRect) {
		const popoverBottomDelta = (containerRect.bottom - popoverRect.bottom)/2
		const bottomOut = popoverRect.bottom > windowRect.bottom;
        const popoverAdjustment = 10 - containerBoundingBox.top;
		const nubbinAdjustment =  popoverBottomDelta - popoverAdjustment;

		const popoverYPos = bottomOut ? popoverAdjustment : popoverBottomDelta;
		const style = bottomOut ? this.positionCSS('Y', 'left', nubbinAdjustment) : "";

		const popoverXPos = containerRect.right + NUBBIN_PADDING;
		return { popoverXPos, popoverYPos, style };
	}

	positionCSS = (axis, position,adjustment) => `
		.${POPOVER_UNIQUE_ID} .popover_container .slds-nubbin--${position}:before { 
    		transform: translate${axis}(${adjustment}) rotate(45deg); 
		} 
		.${POPOVER_UNIQUE_ID} .popover_container .slds-nubbin--${position}:after {  
		    transform: translate${axis}(${adjustment}) rotate(45deg); 
		}`;
}