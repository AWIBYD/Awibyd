from faster_whisper import WhisperModel
import json
m=WhisperModel('small',device='cpu',compute_type='int8')
segs,info=m.transcribe('tmp-upload/song/lagu.mp3',language='id',word_timestamps=True,vad_filter=False,initial_prompt='AWI, BYD, HAKA Auto Karebosi, Makassar')
out=[]
for s in segs: out.append({'s':round(s.start,2),'e':round(s.end,2),'t':s.text,'w':[[round(w.start,2),round(w.end,2),w.word] for w in (s.words or [])]})
json.dump(out,open('tmp-upload/shot/tr.json','w'),ensure_ascii=False,indent=0)
