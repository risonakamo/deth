window.onload=main;

var _curText="";
var _ibox;

function main()
{
    _outpoint=document.querySelector(".output");

    _ibox=document.querySelector(".ibox");
    _ibox.addEventListener("keypress",(e)=>{
        setTimeout(()=>{markDupes(_ibox.value)},100);
    });
}

var _outpoint;
function markDupes(text)
{
    text=text.split("");

    var dupes={};
    for (var x=0,l=text.length;x<l;x++)
    {
        text[x]=text[x].toUpperCase();
        if (dupes[text[x]]==undefined)
        {
            dupes[text[x]]=x;
        }

        else
        {
            if (dupes[text[x]]>=0)
            {
                text[dupes[text[x]]]=`<span class="dupe">${text[dupes[text[x]]]}</span>`;
                dupes[text[x]]=-1;
            }

            text[x]=`<span class="dupe">${text[x]}</span>`;
        }
    }

    for (var x in dupes)
    {
        if (dupes[x]>-1)
        {
            text[dupes[x]]=`<span>${x}</span>`;
        }
    }

    _outpoint.innerHTML=text.join("");

    for (var x=0,l=_outpoint.children.length;x<l;x++)
    {
        _outpoint.children[x].dataset.index=x;
        _outpoint.children[x].addEventListener("mouseenter",(e)=>{
            _ibox.setSelectionRange(e.currentTarget.dataset.index,e.currentTarget.dataset.index);
        });
    }
}