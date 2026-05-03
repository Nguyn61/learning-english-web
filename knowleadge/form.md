1. Form trong HTML là gì?

<form> là vùng chứa để thu thập dữ liệu từ người dùng (login, register, search,...)

Ví dụ cơ bản:

<form action="/submit" method="POST">
  <input type="text" name="username" />
  <button type="submit">Gửi</button>
</form>
Các thuộc tính quan trọng:
action: URL sẽ gửi dữ liệu đến
method:
GET → gửi qua URL (query string)
POST → gửi qua body (an toàn hơn)

👉 Trong thực tế (React), thường không dùng action, mà handle bằng JS (onSubmit).

2. Input là gì?

<input> là field để user nhập dữ liệu

Cú pháp:
<input type="text" name="email" placeholder="Nhập email..." /> 3. Các type phổ biến của input
🔹 Text (cơ bản nhất)
<input type="text" />

→ nhập chữ

🔹 Password
<input type="password" />

→ ẩn ký tự (••••)

🔹 Email
<input type="email" />

→ có validate format email

🔹 Number
<input type="number" />

→ chỉ nhập số

🔹 Checkbox
<input type="checkbox" />

→ chọn nhiều

🔹 Radio
<input type="radio" name="gender" value="male" />
<input type="radio" name="gender" value="female" />

→ chỉ chọn 1 trong nhóm (cùng name)

🔹 Date
<input type="date" />
🔹 File upload
<input type="file" />
🔹 Range (slider)
<input type="range" min="0" max="100" />
🔹 Submit button
<input type="submit" /> 4. Các thuộc tính quan trọng của input
🔸 name (CỰC KỲ QUAN TRỌNG)
<input name="email" />

→ backend sẽ nhận:

{
"email": "value"
}
🔸 placeholder
<input placeholder="Nhập email..." />
🔸 required
<input required />

→ bắt buộc nhập

🔸 value (giá trị mặc định)
<input value="abc" />
🔸 disabled
<input disabled />
🔸 readonly
<input readonly /> 5. Các thẻ liên quan khác trong form
🔹 label
<label for="email">Email</label>
<input id="email" />

👉 click label → focus input

🔹 textarea (input nhiều dòng)
<textarea></textarea>
🔹 select (dropdown)
<select>

  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
