with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

index_html = index_html.replace(
    'https://formsubmit.co/ajax/caiocosta281214@gmail.com',
    'https://formsubmit.co/ajax/7c913242673a4723e187318fe0fd47d3'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Replaced raw email with FormSubmit activated secure token 7c913242673a4723e187318fe0fd47d3!")
