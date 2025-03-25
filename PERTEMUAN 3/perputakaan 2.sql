-- Membuat database perpustakaan
CREATE DATABASE perpustakaan_2;
USE perpustakaan_2;

-- Tabel Anggota
CREATE TABLE anggota (
    id_anggota INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    alamat TEXT NOT NULL,
    no_telp VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    tanggal_bergabung DATE NOT NULL
);

-- Tabel Buku
CREATE TABLE buku (
    id_buku INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(200) NOT NULL,
    penulis VARCHAR(150) NOT NULL,
    penerbit VARCHAR(150) NOT NULL,
    tahun_terbit YEAR NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    jumlah INT NOT NULL CHECK (jumlah >= 0)
);

-- Tabel Peminjaman
CREATE TABLE peminjaman (
    id_peminjaman INT PRIMARY KEY AUTO_INCREMENT,
    id_anggota INT NOT NULL,
    id_buku INT NOT NULL,
    tanggal_pinjam DATE NOT NULL,
    tanggal_kembali DATE NOT NULL,
    status ENUM('Dipinjam', 'Dikembalikan') DEFAULT 'Dipinjam',
    FOREIGN KEY (id_anggota) REFERENCES anggota(id_anggota) ON DELETE CASCADE,
    FOREIGN KEY (id_buku) REFERENCES buku(id_buku) ON DELETE CASCADE
);

-- Tabel Pengembalian
CREATE TABLE pengembalian (
    id_pengembalian INT PRIMARY KEY AUTO_INCREMENT,
    id_peminjaman INT NOT NULL,
    tanggal_dikembalikan DATE NOT NULL,
    denda DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (id_peminjaman) REFERENCES peminjaman(id_peminjaman) ON DELETE CASCADE
);

-- Tabel Petugas
CREATE TABLE petugas (
    id_petugas INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    no_telp VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
