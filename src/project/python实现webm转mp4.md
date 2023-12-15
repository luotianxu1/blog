---
title: python实现webm转mp4
icon: python
order: 3
date: 2023-02-18
category:
    - 其他
tag:
    - 其他
---

## 官网下载ffmeg

[ffmpeg](https://ffmpeg.org/download.html)

## 代码

```python
import tkinter as tk
import os

wind=tk.Tk()
wind.geometry("800x400")
wind.title("视频转码")

title_lab=tk.Label(wind,text="视频转码",font="仿宋 20 bold")
title_lab.place(x=350,y=30)

textlab=tk.Label(wind, text="请输入视频地址:", font="仿宋 20 bold", fg="blue", width=20)
textlab.place(x=0,y=100)
text_entry=tk.Entry(wind, width=30,font="仿宋 20 bold")
text_entry.place(x=300,y=100)

mzlab=tk.Label(wind, text="请输入新视频名称:", font="仿宋 20 bold",fg="blue", width=18)
mzlab.place(x=0,y=200)
mz_entry=tk.Entry(wind, width=30,bg="white",font="仿宋 20 bold")
mz_entry.place(x=300,y=200)

#下面是引用了一个执行转码的方法，并声明执行结果
def getTextInput():
 lianjie = text_entry.get()
 mz = mz_entry.get()
 mz = mz + '.mp4'
 ff = '/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe'
 ff1 = os.getcwd()
 ff = ff1+ff
 result = eval(repr(ff).replace('\\','/'))
 ff = result.replace('//','/')
 cmd = ff +' -i '+lianjie+' -c:v libx264 -c:a aac -strict experimental '+mz

 if os.system(cmd) == 0:  #判断执行结果并进行转码
  test1=tk.Tk()
  test1.geometry("200x100")
  test1.title("")
  title_lab=tk.Label(test1,text="视频转码成功",font="仿宋 20 bold")
  title_lab.place(x=0,y=0)
  test1.mainloop()
 else:
  test2=tk.Tk()
  test2.geometry("200x100")
  test2.title("")
  title_lab=tk.Label(test2,text="视频转码失败",font="仿宋 20 bold")
  title_lab.place(x=0,y=0)
  test2.mainloop()

btn=tk.Button(wind,text="提交", font="仿宋 20 bold", fg="blue", width=8,command=getTextInput) #将信息提交给上面的getTextInput方法
btn.place(x=350,y=300)
wind.mainloop()

```
