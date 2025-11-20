# 🧪 DX Conversation Flow - Quick Test Guide

## 🚀 Start Testing in 2 Minutes

### 1. Start the App
```bash
cd autodecx-test
npm run dev
# Opens on http://localhost:5173 (or similar port)
```

---

## 📋 Complete Test Sequence

### Step 1: Record Audio (30 seconds)
1. ✅ Open the app
2. ✅ Tap the **DX button** (gradient icon at bottom)
3. ✅ Allow microphone access
4. ✅ Speak for ~5 seconds
5. ✅ Tap **DX button again** to stop
6. ✅ See waveform bars in input area
7. ✅ Tap **SEND button**

**Expected:**
- Home cards slide away
- Chat opens with "New Diagnosis" heading

---

### Step 2: Verify Audio Message (10 seconds)
**You should see:**
```
                    [Audio Message]
                    [▶ |||||| 0:05]
        📋 ⬇️ ✏️ 🔄 🗑️
```

**Check:**
- ✅ Purple gradient bubble
- ✅ Waveform preview (20 bars)
- ✅ Play button
- ✅ Duration displayed
- ✅ 5 action icons below
- ✅ Delete icon visible (DX hasn't responded yet)

---

### Step 3: Wait for DX Initial Response (1 second)
**After 0.4 seconds, DX responds:**
```
[DX] "Thank you very much for your audio. 
      Let's begin the analysis. Please give 
      me the model of your vehicle."

📋 📤 👍 👎
```

**Check:**
- ✅ DX avatar shows (not "AI")
- ✅ Gray bubble on left
- ✅ Correct message text
- ✅ 4 action icons below

---

### Step 4: Wait for Vehicle Form (1 second)
**After 0.8 seconds, form appears:**
```
[DX] ┌─────────────────────────┐
     │ Manufacturer: [▼]       │
     │ Year Model: [▼]         │
     │ Vehicle Model: [     ]  │
     │ [Continue Button]       │
     └─────────────────────────┘
```

**Check:**
- ✅ Form appears as DX message bubble
- ✅ DX avatar on left
- ✅ Gray background
- ✅ 3 form fields visible
- ✅ Continue button gray (disabled)

---

### Step 5: Fill the Form (30 seconds)
**Fill in the details:**
1. ✅ Click **Manufacturer** dropdown
   - Select: **BMW**
2. ✅ Click **Year Model** dropdown
   - Select: **2017**
3. ✅ Type in **Vehicle Model** input
   - Type: **330i**
4. ✅ Click **Continue** button
   - Should turn purple when all filled

**Check:**
- ✅ Dropdowns work
- ✅ Input accepts text
- ✅ Continue button enables (purple)
- ✅ Continue button clickable

---

### Step 6: Verify Form Submission (5 seconds)
**After clicking Continue:**
```
                [BMW 2017 330i]
```

**Check:**
- ✅ Form disappears
- ✅ Purple bubble appears on right
- ✅ Shows: "BMW 2017 330i"
- ✅ Single line format
- ✅ White text on purple gradient

---

### Step 7: Verify DX Follow-up (5 seconds)
**After 0.2 seconds, DX responds:**
```
[DX] "Thank you very much for giving me 
      the vehicle model. Now please tell 
      me more about the problem."

📋 📤 👍 👎
```

**Check:**
- ✅ DX message appears
- ✅ Correct text
- ✅ 4 action icons below

---

### Step 8: Final Verification (10 seconds)
**Go back and check the audio message:**
```
                    [Audio Message]
                    [▶ |||||| 0:05]
        📋 ⬇️ ✏️ 🔄
```

**Check:**
- ✅ Delete icon is GONE (DX has responded!)
- ✅ Only 4 icons now (no delete)

---

## ✅ Complete Checklist

### DX Branding
- [ ] Bottom button shows DX icon (not AI)
- [ ] Text says "Tap on the DX" (not AI)
- [ ] All message avatars show "DX" label

### Timing
- [ ] DX initial message: ~0.4s after send
- [ ] Vehicle form: ~0.8s after initial message
- [ ] DX follow-up: ~0.2s after form submit

### Vehicle Form
- [ ] Form has gray background (matches DX messages)
- [ ] Manufacturer dropdown has 7 options
- [ ] Year dropdown has 30 years (2024-1995)
- [ ] Model input accepts text
- [ ] Continue disabled when empty
- [ ] Continue enabled when all filled
- [ ] Continue button is purple when enabled

### Form Submission
- [ ] Shows as user message (purple, right side)
- [ ] Format: `Manufacturer Year Model`
- [ ] Single line display
- [ ] White text

### Messages
- [ ] Audio message has 5 icons initially
- [ ] Delete disappears after DX responds
- [ ] DX messages have 4 icons each
- [ ] All icons have hover effects

---

## 🎯 Expected Final State

**After completing all steps, you should see:**

```
New Diagnosis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    [Audio Message]
                    [▶ |||||| 0:05]
        📋 ⬇️ ✏️ 🔄  (no delete!)

[DX] "Thank you for your audio..."
📋 📤 👍 👎

                [BMW 2017 330i]

[DX] "Thank you for the vehicle model..."
📋 📤 👍 👎
```

---

## 🐛 Common Issues & Solutions

### Issue: DX still shows "AI"
- **Solution**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Issue: Form doesn't appear
- **Solution**: Check browser console for errors
- Wait full 0.8 seconds after initial DX message

### Issue: Continue button stays gray
- **Solution**: Ensure ALL 3 fields are filled
- Manufacturer, Year, and Model all required

### Issue: Form submission doesn't work
- **Solution**: Click Continue, not just press Enter
- Make sure model field has text

### Issue: Delete icon still visible
- **Solution**: This is correct UNTIL form is submitted
- After form submission, delete should disappear

---

## ⏱️ Timing Reference

| Event | Delay | Total Time |
|-------|-------|------------|
| Send audio | 0s | 0s |
| DX initial message | 0.4s | 0.4s |
| Vehicle form appears | 0.8s | 1.2s |
| User fills form | Variable | ~1-2 min |
| Form submission | Instant | ~1-2 min |
| DX follow-up | 0.2s | ~1-2 min |

---

## 🎬 Video Walkthrough Timeline

**Suggested recording timestamps:**
- 0:00 - Open app
- 0:05 - Tap DX button
- 0:10 - Allow microphone
- 0:15 - Speak/record
- 0:20 - Stop recording
- 0:22 - See waveform in input
- 0:24 - Tap SEND
- 0:25 - Cards slide away
- 0:26 - Audio message appears
- 0:27 - DX initial message (0.4s later)
- 0:28 - Vehicle form appears (0.8s later)
- 0:35 - Fill manufacturer
- 0:40 - Fill year
- 0:45 - Fill model
- 0:47 - Click Continue
- 0:48 - See "BMW 2017 330i" bubble
- 0:49 - DX follow-up appears
- 0:52 - Check delete icon gone
- 0:55 - Done!

**Total demo time: ~1 minute**

---

## 📸 Screenshots to Capture

1. **DX Button (idle)** - Gradient icon at bottom
2. **Recording** - Red button with pulsing dot
3. **Waveform in input** - Static bars before send
4. **Audio message** - With 5 action icons
5. **DX initial message** - "Thank you for your audio..."
6. **Vehicle form** - All 3 fields + button
7. **Form filled** - All dropdowns selected
8. **Continue enabled** - Purple button
9. **Form submission** - "BMW 2017 330i" bubble
10. **DX follow-up** - "Tell me about the problem..."
11. **Final state** - All messages visible, delete icon gone

---

## ✨ Success Criteria

You've successfully verified the implementation when:

✅ All "AI" references changed to "DX"  
✅ DX initial message appears automatically  
✅ Vehicle form appears as DX message bubble  
✅ All 3 form fields work correctly  
✅ Continue button enables when filled  
✅ Form submission shows as purple user bubble  
✅ Format is `Manufacturer Year Model`  
✅ DX follow-up appears after submission  
✅ Delete icon disappears after DX responds  
✅ All animations smooth and polished  

---

**Testing Time**: ~2-3 minutes  
**Status**: Ready to Test!  
**Dev Server**: Running (check terminal for port)
