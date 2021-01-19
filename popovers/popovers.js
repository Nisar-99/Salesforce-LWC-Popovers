import { LightningElement, track, api } from "lwc";

const SLDS_POPOVER_CLASS = "slds-popover ";
const POPOVER_SIZES = {
  small: " slds-popover_small",
  medium: " slds-popover_medium",
  large: " slds-popover_large"
};

const VARIANTS = {
  warning: " slds-popover_warning",
  error: " slds-popover_error",
  brand : " slds-popover_brand",
  success : " slds-popover_success",
  walk: " slds-popover_walkthrough"
};

export default class Popovers extends LightningElement {
  @api size = POPOVER_SIZES["medium"];
  @api variant;
  @api placement = "auto";
  @api withClose = false;

  popoverUniqueId = `popover${
    Date.now() + Math.floor(Math.random() * 100000000000000)
  }`;
  @track popoverContainerClass = `${this.popoverUniqueId} popover_container`;
  @track nubbinPlacement = `${SLDS_POPOVER_CLASS} slds-nubbin--bottom`;

  @track hasHeader = true;
  @track hasBody = true;
  @track hasFooter = true;

  @track popoverClass = "";
  @track popoverStyle = "";
  @track closeButtonVariant = "";

  hasStyleCreated = false;
  hasRendered = false;

  renderedCallback() {
    if (this.hasRendered) return;

    this.hasRendered = true;
    this.addPopoverClass();
    this.handleSlot();
  }

  handleSlot() {
    [...this.template.querySelectorAll("slot")].forEach((slot) => {
      let hasSlotValue =
        slot.assignedElements().length !== 0 && slot.outerText.length !== 0;
      switch (slot.name.toLowerCase()) {
        case "header":
          this.hasHeader = hasSlotValue;
          break;
        case "body":
          this.hasBody = hasSlotValue;
          break;
        case "footer":
          this.hasFooter = hasSlotValue;
          break;
        default:
      }
    });
    this.popoverClass = "popover";
  }

  addPopoverClass() {
    let style = SLDS_POPOVER_CLASS;
    switch (this.placement.toLowerCase()) {
      case "top":
        style += "slds-nubbin--bottom";
        break;
      case "bottom":
        style += "slds-nubbin--top";
        break;
      case "left":
        style += "slds-nubbin--right";
        break;
      case "right":
        style += "slds-nubbin--left";
        break;
      default:
        style += "slds-nubbin--bottom";
    }
    style +=
      this.variant && VARIANTS[this.variant] ? VARIANTS[this.variant] : "";
    style +=
      this.size && POPOVER_SIZES[this.size]
        ? POPOVER_SIZES[this.size]
        : POPOVER_SIZES["medium"];
    console.log("style : ", style);
    this.nubbinPlacement = style;
    this.closeButtonVariant = this.variant ? "inverse" : "";
  }

  tryToHide() {
    this.popoverStyle =
      "position: fixed; left: -999999px; top:-999999px;visibility: hidden;opacity: 0;";
  }

  handleMouseOverOrFocusElement(event) {
    let popoverStyleOptions = this.calculatePopoverPosition(event);
    this.popoverStyle =
      "position: absolute; left: " +
      popoverStyleOptions.popoverXPos +
      "px; top: " +
      popoverStyleOptions.popoverYPos +
      "px;visibility: visible;opacity: 1;z-index: 9999;";

    console.log("popoverStyleOptions : ", popoverStyleOptions);
  }

  handleMouseLeaveOrBlurElement(event) {
    event.stopPropagation();
    if (!this.withClose) {
      this.tryToHide();
    }
  }

  handlePopoverClose() {
    console.log("OUTPUT : ", "handlePopoverClose");
    this.tryToHide();
    //this.dispatchEvent(new CustomEvent("close"));
  }

  calculatePopoverPosition(currentEvent) {
    let popoverEl = this.template.querySelector(".popover");
    let popoverBoundingBox = popoverEl.getBoundingClientRect();
    let popoverWidth = Math.ceil(popoverBoundingBox.width);
    let popoverHeight = popoverBoundingBox.height;

    let containerEl = this.template.querySelector(".popover_container");
    let containerBoundingBox = containerEl.getBoundingClientRect();
    let containerWidth = containerBoundingBox.width;
    let containerHeight = containerBoundingBox.height;
    let containerLeft = containerBoundingBox.left;
    let containerRight = containerBoundingBox.right;

    let placement = this.placement;
    let popoverAdjustment;
    let adjustment;
    let nubbinAdjustment;

    // Check for auto placement
    if (placement.startsWith("auto ")) {
      // Remove auto placement to perform bounding checks on preferred placement
      placement = placement.replace("auto ", "");

      var windowBoundingBox = {
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        left: 0
      };

      // placements. If there is
      if ( placement === "top" && containerBoundingBox.top - popoverBoundingBox.height <  windowBoundingBox.top ) {
        placement = "bottom";
      } else if ( placement === "right" &&  containerBoundingBox.right + popoverBoundingBox.width > windowBoundingBox.right ) {
        placement = "left";
      } else if (  placement === "bottom" && containerBoundingBox.bottom + popoverBoundingBox.height > windowBoundingBox.bottom ) {
        placement = "top";
      } else if ( placement === "left" && containerBoundingBox.left - popoverBoundingBox.width <  windowBoundingBox.left ) {
        placement = "right";
      }
    }
    console.log('placement:: : ',placement);
    let popoverYPos, popoverXPos;
    let nubbinPadding = 14;

    let popoverStyle = document.createElement("style");

    if (placement === "right") {
      popoverXPos = containerWidth + nubbinPadding;
      popoverYPos = (containerHeight - popoverHeight) / 2;

      if (popoverHeight > window.innerHeight) {
        popoverAdjustment = 10 - containerBoundingBox.top;
        nubbinAdjustment = popoverYPos - popoverAdjustment;
        popoverStyle.innerHTML =
          "." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--left:before { transform: translateY(" +
          nubbinAdjustment +
          "px) rotate(45deg); } ." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--left:after { transform: translateY(" +
          nubbinAdjustment +
          "px) rotate(45deg); }";
        popoverYPos = popoverAdjustment;
      } else {
        popoverStyle.innerHTML = "";
      }
    } else if (placement === "bottom") {
      popoverXPos = (containerWidth - popoverWidth) / 2;
      popoverYPos = containerHeight + nubbinPadding;

      if (containerLeft + popoverXPos < 4) {
        adjustment = Math.abs(containerLeft + popoverXPos) + 4;

        popoverXPos += adjustment;
        popoverStyle.innerHTML =
          "." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--top:before { transform: translateX(" +
          -adjustment +
          "px) rotate(45deg); } ." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--top:after { transform: translateX(" +
          -adjustment +
          "px) rotate(45deg); }";
      } else if (
        containerRight + Math.abs(popoverXPos) >
        window.innerWidth - 4
      ) {
        adjustment =
          containerRight + Math.abs(popoverXPos) - (window.innerWidth - 4);

        popoverXPos -= adjustment;
        popoverStyle.innerHTML =
          "." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--top:before { transform: translateX(" +
          adjustment +
          "px) rotate(45deg); }." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--top:after { transform: translateX(" +
          adjustment +
          "px) rotate(45deg); }";
      }
    } else if (placement === "left") {
      popoverXPos = -popoverWidth - nubbinPadding;
      popoverYPos = (containerHeight - popoverHeight) / 2;

      if (popoverHeight > window.innerHeight) {
        popoverAdjustment = 10 - containerBoundingBox.top;
        nubbinAdjustment = popoverYPos - popoverAdjustment;
        popoverStyle.innerHTML =
          "." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--right:before { transform: translateY(" +
          nubbinAdjustment +
          "px) rotate(45deg); } ." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--right:after { transform: translateY(" +
          nubbinAdjustment +
          "px) rotate(45deg); }";

        popoverYPos = popoverAdjustment;
      } else {
        popoverStyle.innerHTML = "";
      }
    } else {
      // Top
      popoverXPos = (containerWidth - popoverWidth) / 2;
      popoverYPos = -popoverHeight - nubbinPadding;


      console.log('popoverXPos 1: ',popoverXPos);

      if (containerLeft + popoverXPos < 4) {
        adjustment = Math.abs(containerLeft + popoverXPos) + 4;
	console.log('adjustment 1: ',adjustment);
        popoverXPos += adjustment;
        popoverStyle.innerHTML =
          "." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--bottom:before { transform: translateX(" +
          -adjustment +
          "px) rotate(45deg); } ." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--bottom:after { transform: translateX(" +
          -adjustment +
          "px) rotate(45deg); }";
      } else if ( containerRight + Math.abs(popoverXPos) >  window.innerWidth - 4  ) {
	      console.log('containerRight : ',containerRight, window.innerWidth);
        adjustment = containerRight + Math.abs(popoverXPos) - (window.innerWidth - 19 /*4 */);
	 console.log('adjustment 2: ',adjustment);
	 popoverXPos -= adjustment;
	 console.log('popoverXPos2 : ',popoverXPos);
        popoverStyle.innerHTML =
          "." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--bottom:before { transform: translateX(" +
          adjustment +
          "px) rotate(45deg); } ." +
          this.popoverUniqueId +
          ".popover_container .slds-nubbin--bottom:after { transform: translateX(" +
          adjustment +
          "px) rotate(45deg); }";
      }
    }

    if (!this.hasStyleCreated) {
      document.body.appendChild(popoverStyle);
      this.hasStyleCreated = true;
    }

    return {
      popoverXPos: popoverXPos,
      popoverYPos: popoverYPos,
      width: popoverWidth
    };
  } //met
}