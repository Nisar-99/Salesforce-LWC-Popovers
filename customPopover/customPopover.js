import { LightningElement, api } from 'lwc';
import { NUBBIN_PLACEMENT, CLOSE_BUTTON_VARIANT, POPOVER_CONTAINER_CLASS, POPOVER_UNIQUE_ID, NUBBIN_PADDING } from './constants';
export default class CuostomPopover extends LightningElement {
    @api size;
    @api placement = "top";
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
		
  	  	const { popoverXPos, popoverYPos, style:customStyle } = this.calculatePopoverPosition();
		const style = document.documentElement.style;


		style.setProperty('--popover-x-pos', `${popoverXPos}px`);

		style.setProperty('--popover-x-pos', `${popoverXPos}px`);
		style.setProperty('--popover-y-pos', `${popoverYPos}px`);

  	    this.popoverStyle ="popover_show";
  	}

	calculatePopoverPosition() {
		const popoverRect = this.template.querySelector(".popover").getBoundingClientRect();
		const containerRect = this.template.querySelector(".popover_container").getBoundingClientRect();
		const windowRect = { top:0, width: window.innerWidth, height: window.innerHeight, left: 0 };

		const placement = calcPlacement(popoverRect, containerRect, windowRect, this.placement);
		(placement === 'left' || placement === 'right') && calcHorisontal(popoverRect, containerRect, windowRect, placement) ||
		(placement === 'top' || placement === 'bottom') && calcVertical(popoverRect, containerRect, windowRect, placement);
		return { popoverXPos: 0, popoverYPos:0, popoverWidth:0, popoverHeight:0 };
    }

	calcPlacement(popoverRect, containerRect, windowRect, placement) { 
    	if ( placement === "top"    && containerRect.top    - popoverRect.height < windowRect.top )   return "bottom";
		if ( placement === "right"  && containerRect.right  + popoverRect.width  > windowRect.right)  return "left";
    	if ( placement === "bottom" && containerRect.bottom + popoverRect.height > windowRect.bottom) return "top";
    	if ( placement === "left"   && containerRect.left   - popoverRect.width  < windowRect.left)   return "right";
	}
	calcHorisontal(popoverRect, containerRect, windowRect, placement) {
		const popoverHeightDelta = (containerRect.height - popoverRect.height)/2
		const heightOut = popoverRect.height > windowRect.height;
        const popoverAdjustment = 10 - containerRect.top;
		const nubbinAdjustment =  popoverHeightDelta - popoverAdjustment;

		const popoverYPos = heightOut ? popoverAdjustment : popoverHeightDelta;
		const style = heightOut ? this.positionCSS('Y', placement, nubbinAdjustment) : "";
        
		const width = placement === 'left' ? containerRect.width : popoverRect.width + NUBBIN_PADDING;
		const popoverXPos = width * ( placement === 'right' ?-1 :1);
		return { popoverXPos, popoverYPos, style };
	}
	calcVertical(popoverRect, containerRect, windowRect, placement) {
      	const containerWidthDelta = (containerRect.width - popoverRect.width) / 2;

		const position =  placement === 'bottom' ? 'top' : 'bottom';

		const leftOut = (containerRect.left + containerWidthDelta) < 4;
		const rightOut = (containerRect.right + Math.abs(containerWidthDelta)) > windowRect.width - 4;

		if (leftOut) {
			nubbinAdjustment = Math.abs(containerRect.left + containerWidthDelta) + 4;
			popoverXPos += nubbinAdjustment;
			nubbinAdjustment = -1 * nubbinAdjustment;
		} else if (rightOut) {
			nubbinAdjustment = Math.abs(containerRect.right + containerWidthDelta) - windowRect.width + 4;
			popoverXPos -= nubbinAdjustment;
		}
        popoverYPos = containerRect.height + NUBBIN_PADDING * ( placement === 'bottom' ? 1 : -1);
	
		const style = this.positionCSS('X', position, nubbinAdjustment);
		return { popoverXPos, popoverYPos, style };
	}

	positionCSS = (axis, position, adjustment) => `
		.${POPOVER_UNIQUE_ID} .popover_container .slds-nubbin--${position}:before { 
    		transform: translate${axis}(${adjustment}) rotate(45deg); 
		} 
		.${POPOVER_UNIQUE_ID} .popover_container .slds-nubbin--${position}:after {  
		    transform: translate${axis}(${adjustment}) rotate(45deg); 
		}`;
}