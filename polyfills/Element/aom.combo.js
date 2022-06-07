// aom (beta)

// https://www.digitala11y.com/wai-aria-1-1-cheat-sheet/
// https://github.com/A11yance/aria-query
// https://github.com/xi/aria-api


// role reflection
// https://wicg.github.io/aom/spec/aria-reflection.html#role-reflection
if (!('role' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'role', {
        get: function() {
            return this.getAttribute('role');
        },
        set: function(value) {
            this.setAttribute('role', value);
        }
    });
}

// reflected attributes
// https://wicg.github.io/aom/spec/aria-reflection.html#attribute-reflection
const props = ['ActiveDescendant','Atomic','AutoComplete','Busy','Checked','ColCount','ColIndex','ColSpan','Controls','Current','DescribedBy','Details','Disabled','ErrorMessage','Expanded','FlowTo','HasPopup','Hidden','Invalid','KeyShortcuts','Label','LabelledBy','Level','Live','Modal','MultiLine','MultiSelectable','Orientation','Owns','Placeholder','PosInSet','Pressed','ReadOnly','Relevant','Required','RoleDescription','RowCount','RowIndex','RowSpan','Selected','SetSize','Sort','ValueMax','ValueMin','ValueNow','ValueText'];
for (const prop of props) {
    const realProp = 'aria'+prop;
    const attr = 'aria-'+prop.toLowerCase();
    if (!(realProp in Element.prototype)) {
        Object.defineProperty(Element.prototype, realProp, {
            get: function() {
                return this.getAttribute(attr);
            },
            set: function(value) {
                this.setAttribute(attr, value);
            }
        });
    }
}

// computedRole
if (!('computedRole' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'computedRole', {
        get: function() {
            let role = this.getAttribute('role');
            if (roles[role]) return role;
            const tag = this.tagName.toLowerCase();
            if (elementToRoles[tag]) {
                return elementToRoles[tag][0];
            } else {
                for (selector in elementToRoles) {
                    if (this.matches(selector)) {
                        return elementToRoles[selector][0];
                    }
                }
                return null;
            }
        },
        set: function() {}
    });

    const roles = {alert:1,alertdialog:1,application:1,article:1,banner:1,button:1,cell:1,checkbox:1,columnheader:1,combobox:1,command:1,complementary:1,composite:1,contentinfo:1,definition:1,dialog:1,directory:1,document:1,feed:1,figure:1,form:1,grid:1,gridcell:1,group:1,heading:1,img:1,input:1,landmark:1,link:1,list:1,listbox:1,listitem:1,log:1,main:1,marquee:1,math:1,menu:1,menubar:1,menuitem:1,menuitemcheckbox:1,menuitemradio:1,navigation:1,note:1,option:1,presentation:1,progressbar:1,radio:1,radiogroup:1,range:1,region:1,roletype:1,row:1,rowgroup:1,rowheader:1,scrollbar:1,search:1,searchbox:1,section:1,sectionhead:1,select:1,separator:1,slider:1,spinbutton:1,status:1,structure:1,tab:1,Table:1,tablist:1,tabpanel:1,Term:1,textbox:1,timer:1,toolbar:1,tooltip:1,tree:1,treegrid:1,treeitem:1,widget:1,window:1,none:1};

    const elementToRoles = {
        'article':  [ 'article' ] ,
        'button':  [ 'button' ] ,
        'td':  ['cell', 'gridcell' ] ,
        'input[type=checkbox]': [ 'checkbox' ] ,
        'th':  [ 'columnheader' ] ,
        'select':  [ 'combobox', 'listbox' ] ,
        'menuitem':  [ 'command', 'menuitem' ] ,
        'dd':  [ 'definition' ] ,
        'figure':  [ 'figure' ] ,
        'form':  [ 'form' ] ,
        'table':  [ 'table', 'grid' ] ,
        'fieldset':  [ 'group' ] ,
        'h1':  [ 'heading' ] ,
        'h2':  [ 'heading' ] ,
        'h3':  [ 'heading' ] ,
        'h4':  [ 'heading' ] ,
        'h5':  [ 'heading' ] ,
        'h6':  [ 'heading' ] ,
        'img':  [ 'img' ] ,
        'a':  [ 'link' ] ,
        'link':  [ 'link' ] ,
        'ol':  [ 'list' ] ,
        'ul':  [ 'list' ] ,
        'li':  [ 'listitem' ] ,
        'nav':  [ 'navigation' ] ,
        'option':  [ 'option' ] ,
        'input[type=radio]' : [ 'radio' ] ,
        'frame':  [ 'region' ] ,
        'rel':  [ 'roletype' ] ,
        'tr':  [ 'row' ] ,
        'tbody':  [ 'rowgroup' ] ,
        'tfoot':  [ 'rowgroup' ] ,
        'thead':  [ 'rowgroup' ] ,
        'th[scrope=row]': [ 'rowheader' ] ,
        'input[type=search]': [ 'searchbox' ] ,
        'hr':  [ 'separator' ] ,
        'dt':  [ 'term' ] ,
        'dfn':  [ 'term' ] ,
        'textarea':  [ 'textbox' ] ,
        'input[type=text]': [ 'textbox' ] ,
        'input:not([type])': [ 'textbox' ] ,
        'input[type=submit]': [ 'pushbutton' ] ,
    };
}






/*
todo:

ariaActiveDescendantElement
ariaAtomic
ariaAutoComplete
ariaBusy
ariaChecked
ariaColCount
ariaColIndex
ariaColSpan
ariaControlsElements
ariaCurrent
ariaDescribedByElements
ariaDescription
ariaDetailsElements
ariaDisabled
ariaErrorMessageElement
ariaExpanded
ariaFlowToElements
ariaHasPopup
ariaHidden
ariaInvalid
ariaKeyShortcuts
ariaLabel
ariaLabelledByElements
ariaLevel
ariaLive
ariaModal
ariaMultiLine
ariaMultiSelectable
ariaOrientation
ariaOwnsElements
ariaPlaceholder
ariaPosInSet
ariaPressed
ariaReadOnly
ariaRelevant
ariaRequired
ariaRoleDescription
ariaRowCount
ariaRowIndex
ariaRowSpan
ariaSelected
ariaSetSize
ariaSort
ariaValueMax
ariaValueMin
ariaValueNow
ariaValueText
ariaVirtualContent
*/