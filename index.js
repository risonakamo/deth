window.onload=main;

var _outpoint;
var _curText="";
var _ibox;

function main()
{
    _outpoint=document.querySelector(".output");

    _ibox=document.querySelector(".ibox");
    _ibox.addEventListener("keydown",(e)=>{
        setTimeout(()=>{markDupes2(_ibox.value)},100);
    });
}

function markDupes2(text)
{
    text=text.split("");
    var text_l=text.length;

    var dupes={};
    for (var x=0;x<text_l;x++)
    {
        text[x]=text[x].toUpperCase();
        if (!dupes[text[x]])
        {
            dupes[text[x]]=[x];
        }

        else
        {
            dupes[text[x]].push(x);
        }
    }

    var isdupe=0;
    for (var x=0;x<text_l;x++)
    {
        if (dupes[text[x]].length>1)
        {
            isdupe="dupe";
        }

        else
        {
            isdupe="";
        }

        text[x]=`<span class="${isdupe}" data-index="${x}" data-letter="${text[x]}">${text[x]}</span>`;
    }

    _outpoint.innerHTML=text.join("");

    for (var x=0;x<text_l;x++)
    {
        _outpoint.children[x].addEventListener("mouseenter",(e)=>{
            _ibox.focus();
            _ibox.setSelectionRange(parseInt(e.currentTarget.dataset.index)+1,
                parseInt(e.currentTarget.dataset.index)+1);

            for (var y=0,l=dupes[e.currentTarget.dataset.letter].length;y<l;y++)
            {
                _outpoint.children[dupes[e.currentTarget.dataset.letter][y]].classList.add("dupe-select");
            }
        });

        _outpoint.children[x].addEventListener("mouseleave",(e)=>{
            for (var y=0,l=dupes[e.currentTarget.dataset.letter].length;y<l;y++)
            {
                _outpoint.children[dupes[e.currentTarget.dataset.letter][y]].classList.remove("dupe-select");
            }
        });
    }
}