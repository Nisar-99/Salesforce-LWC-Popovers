## Salesforce LWC Popovers

A popover is a non-modal dialog. The component should be paired with a hoverable trigger element and contain at least one focusable element. Multiple popovers open at the same time, each with focus trap is not supported.



### Parameter Details

| Names | Default | Required | Description |
| :--- | :--- | :---: | :--- |
| `size` | `medium` |  :x: | Being used for pop-up size. |
| `variant` | optional | :x: | Determines the type of the popover. error and warning allows the content body to scroll. Default is base. |
| `placement` | `auto` | :x: | Aligns the popover with the respective side of the trigger. That is top will place the Popover above the trigger.|
| `with-close` | `false` | :x: | This function is triggered when the dialog is closed. This occurs when the Dialog child component (that is the actual popover) is unmounted and removed from the DOM.. |

### Slot Property Details

| Names | Values  | Required | Description |
| :--- | :--- | :---: | :--- |
| `value` | `Text/HTML` | :heavy_check_mark: | it's main value `(Text / HTML)`, the user will hover over it|
| `header` | `Text/HTML` | :x: | All popovers require a heading that labels the popover for assistive technology users. This text will be placed within a heading HTML tag.|
| `body` | `Text/HTML` | :x: | The contents of the popover. This should also markup language.|
| `footer` | `Text/HTML` | :x: | A footer is an optional. Buttons are often placed here.|



#### Example

> Popover with simple text

`Html:` 

```html
Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
<c-popovers variant="walk">
    <div slot="value">
        <b>More-or-less</b>
    </div>
    <p slot="header">Hello World</p>
    <div slot="body">
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
    </div>
    <div slot="footer">
        Thank You
    </div>
</c-popovers>
when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
```


**Output:**

![output](https://github.com/Nisar-99/Salesforce-LWC-Popovers/blob/main/output1.jpg)


> Popover with markup language (HTML)

`Html:`

```html
Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
<c-popovers size="large" with-close variant="brand">
    <div slot="value">
        <b> Opportunity </b>
    </div>
    <p slot="header">Opportunity</p>
    <div slot="body">
        <table class="slds-table slds-table_cell-buffer slds-table_bordered">
            <thead>
                <tr class="slds-line-height_reset">
                    <th> Opportunity Name </th>
                    <th> Stage </th>
                    <th> Confidence </th>
                    <th> Stage </th>
                    <th> Confidence </th>
                </tr>
            </thead>
            <tbody>
                <tr class="slds-hint-parent">
                    <th> Cloudhub </th>
                    <th> Prospecting </th>
                    <th> 20% </th>
                    <th> Cloudhub </th>
                    <th> Prospecting </th>
                </tr>
                <tr class="slds-hint-parent">
                    <th> SalesCloud </th>
                    <th> Prospecting </th>
                    <th> 90% </th>
                    <th> Prospecting </th>
                    <th> 90% </th>
                </tr>
            </tbody>
        </table>
    </div>
    <div slot="footer">
        Read More...
        <!-- <lightning-button variant="brand" label="Save"></lightning-button> -->
    </div>
</c-popovers>
when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
```

**Output:**

![output](https://github.com/Nisar-99/Salesforce-LWC-Popovers/blob/main/output2.jpg)

> More information about Popovers: [Click Here](https://www.lightningdesignsystem.com/components/popovers/#site-main-content)


**More:**

 * [Salesforce Assistant](https://chrome.google.com/webstore/detail/salesforce-assistant/acpngnlieelljdlljmenkagbonaicccj)
 * [Salesforce Lightning code snippets](https://marketplace.visualstudio.com/items?itemName=Nik-Creation.lwc-salesforce)

Thank you...
