const inputTugas = document.getElementById('input-tugas');
const btnTambah = document.getElementById('btn-tambah');
const daftarTugas = document.getElementById('daftar-tugas');
const pesanKosong = document.getElementById('pesan-kosong');

const statTotal = document.getElementById('stat-total');
const statSelesai = document.getElementById('stat-selesai');
const statBelum = document.getElementById('stat-belum');

function updateStatistik() {
  const semua = daftarTugas.getElementsByTagName('li');
  let selesai = 0;

  for (let i = 0; i < semua.length; i++) {
    if (semua[i].classList.contains('completed')) {
      selesai++;
    }
  }

  statTotal.textContent = semua.length;
  statSelesai.textContent = selesai;
  statBelum.textContent = semua.length - selesai;

  if (semua.length === 0) {
    pesanKosong.classList.remove('hidden');
  } else {
    pesanKosong.classList.add('hidden');
  }
}

function tambahTugas() {
  const teks = inputTugas.value.trim();

  if (teks === '') {
    alert('Kamu belum memasukkan to do list');
    return;
  }

  const li = document.createElement('li');
  li.classList.add('tugas-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = teks;

  const hapus = document.createElement('button');
  hapus.textContent = 'X';

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(hapus);
  daftarTugas.appendChild(li);

  checkbox.onclick = function () {
    li.classList.toggle('completed', checkbox.checked);
    updateStatistik();
  };

  span.onclick = function () {
    checkbox.checked = !checkbox.checked;
    li.classList.toggle('completed', checkbox.checked);
    updateStatistik();
  };

  hapus.onclick = function () {
    li.remove();
    updateStatistik();
  };

  inputTugas.value = '';
  inputTugas.focus();
  updateStatistik();
}

btnTambah.onclick = tambahTugas;

inputTugas.onkeydown = function (e) {
  if (e.key === 'Enter') {
    tambahTugas();
  }
};

updateStatistik();