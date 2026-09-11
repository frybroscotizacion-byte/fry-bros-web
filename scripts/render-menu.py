from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
import os
os.chdir(Path(__file__).resolve().parents[1])
pdfmetrics.registerFont(TTFont('Body','fonts/Chewy-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Title','fonts/Chewy-Regular.ttf'))
c=canvas.Canvas('docs/menu-hamburguesas.pdf',pagesize=(595,842));c.setTitle('Hamburguesas Fry Bros - Carta');c.setAuthor('Fry Bros')
yellow='#ffde45'
def box(x,y,w,h,color):
 c.setFillColor(HexColor(color));c.rect(x,y,w,h,stroke=0,fill=1)
def text(x,y,s,size=12,color='#ffffff',font='Body',center=False):
 c.setFillColor(HexColor(color));c.setFont(font,size)
 (c.drawCentredString if center else c.drawString)(x,y,s)
def banner(y):
 pts=[(0,2),(15,0),(220,2),(313,0),(319,5),(315,12),(320,18),(316,24),(320,32),(316,39),(318,47),(215,45),(80,48),(4,46),(1,38),(5,30),(0,22),(4,13)]
 p=c.beginPath();p.moveTo(pts[0][0]+49,pts[0][1]+y)
 for x,z in pts[1:]:p.lineTo(x+49,z+y)
 p.close();c.setFillColor(HexColor(yellow));c.drawPath(p,fill=1,stroke=0)
def missing(y):
 c.setLineWidth(0.7);c.setStrokeColor(HexColor('#686868'));c.setDash(3,3);c.setFillColor(HexColor('#111111'));c.roundRect(394,y,148,132,5,fill=1,stroke=1);c.setDash()
 c.setStrokeColor(HexColor('#aaaaaa'));c.setLineWidth(1.4);c.rect(457,y+65,22,28,fill=0,stroke=1)
 p=c.beginPath();p.moveTo(460,y+70);p.lineTo(466,y+78);p.lineTo(472,y+72);p.lineTo(476,y+77);c.drawPath(p)
 text(468,y+39,'Imagen no disponible',9,'#b8b8b8',center=True)
box(0,0,595,842,'#080808')

text(297.5,747,'HAMBURGUESAS',43,yellow,'Title',True);text(297.5,701,'FRY BROS',45,yellow,'Title',True)

c.setStrokeColor(HexColor(yellow));c.setLineWidth(5)
for x,sign in [(29,1),(566,-1)]:
 for y,d in [(635,-1),(157,1)]:
  p=c.beginPath();p.moveTo(x+sign*24,y);p.lineTo(x,y);p.lineTo(x,y+d*62);c.drawPath(p)
options=[('American Bacon','Carne de hamburguesa, queso cheddar, tocino, salsa BBQ y cebolla caramelizada.'),('Italiana','Carne de hamburguesa, queso cheddar, tomate, lechuga, pepinillos y mayonesa Fry Bros.'),('Special Fry Bros','Carne de hamburguesa, queso cheddar, tocino, cebolla caramelizada, tomate, lechuga y mayonesa Fry Bros.')]
for i,(title,desc) in enumerate(options):
 y=568-i*153;banner(y);text(65,y+15,title.upper(),26,'#080808','Title')
 para=Paragraph(desc,ParagraphStyle('body',fontName='Body',fontSize=17,leading=22,textColor=HexColor('#ffffff')));_,h=para.wrap(303,100);para.drawOn(c,57,y-13-h);missing(y-89)
text(297.5,114,'Papas fritas y hamburguesas para eventos.',13,yellow,'Title',True)
text(297.5,88,'Nosotros cocinamos. Tú disfrutas.',13,yellow,'Title',True)
text(297.5,51,'@fry_bros_  ·  +56 9 4286 3211',12,yellow,center=True)
c.linkURL('https://wa.me/56942863211',(175,40,422,68),relative=0);c.save()
