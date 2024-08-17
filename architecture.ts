/**
 * CleanArchitecture là một phương pháp thiết kế phần mềm nhằm tách biệt các thành phần của hệ thống thành các lớp riêng biệt,
 * giúp tăng tính rõ ràng, dễ bảo trì và mở rộng của mã nguồn. Nó bao gồm các thành phần chính như domain, application, và infrastructure,
 * mỗi thành phần chịu trách nhiệm về một khía cạnh cụ thể của hệ thống.
 */
export namespace CleanArchitecture {
  // Command represents a request to perform a specific action in the system.
  export type Command = Record<string, any>;

  // Query is used to query data from the system without changing its state.
  export type Query = Record<string, any>;

  type Folder = Record<string, any>;

  /**
   * Domain trong clean architecture là một phần quan trọng của hệ thống, chịu trách nhiệm quản lý logic nghiệp vụ cốt lõi.
   * Nó bao gồm các thành phần như entities, valueObjects, aggregates, repositories, services, events và exceptions.
   * Mỗi thành phần này đóng một vai trò cụ thể trong việc duy trì tính toàn vẹn và nhất quán của dữ liệu, cũng như
   * tách biệt logic nghiệp vụ khỏi các chi tiết kỹ thuật.
   */
  export interface Domain {
    /**
     * Entities trong domain clean architecture là các đối tượng có định danh riêng và trạng thái thay đổi theo thời gian.
     * Chúng đại diện cho các thực thể trong thế giới thực hoặc các khái niệm quan trọng trong hệ thống.
     * Mỗi entity có một định danh duy nhất để phân biệt với các entity khác, và định danh này không thay đổi trong suốt vòng đời của entity.
     * - Lợi ích của việc sử dụng entities:
     *   + Đảm bảo tính toàn vẹn và nhất quán của dữ liệu bằng cách quản lý trạng thái và hành vi của các thực thể.
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách sử dụng các đối tượng có ý nghĩa cụ thể.
     *   + Giảm sự phức tạp trong việc quản lý các thực thể có trạng thái thay đổi.
     * - Examples:
     * ```typescript
     * class Book {
     *   private id: string;
     *   private title: string;
     *   private author: string;
     *   private isbn: string;
     *   private publishedDate: Date;
     *   private availableCopies: number;
     *
     *   constructor(
     *     id: string,
     *     title: string,
     *     author: string,
     *     isbn: string,
     *     publishedDate: Date,
     *     availableCopies: number
     *   ) {
     *     this.id = id;
     *     this.title = title;
     *     this.author = author;
     *     this.isbn = isbn;
     *     this.publishedDate = publishedDate;
     *     this.availableCopies = availableCopies;
     *   }
     *
     *   // Getters
     *   getId(): string {
     *     return this.id;
     *   }
     *
     *   getTitle(): string {
     *     return this.title;
     *   }
     *
     *   getAuthor(): string {
     *     return this.author;
     *   }
     *
     *   getIsbn(): string {
     *     return this.isbn;
     *   }
     *
     *   getPublishedDate(): Date {
     *     return this.publishedDate;
     *   }
     *
     *   getAvailableCopies(): number {
     *     return this.availableCopies;
     *   }
     *
     *   // Setters và các phương thức khác
     *   updateTitle(newTitle: string): void {
     *     this.title = newTitle;
     *   }
     *
     *   updateAuthor(newAuthor: string): void {
     *     this.author = newAuthor;
     *   }
     *
     *   decreaseAvailableCopies(): void {
     *     if (this.availableCopies > 0) {
     *       this.availableCopies--;
     *     } else {
     *       throw new Error("Không còn bản sao khả dụng");
     *     }
     *   }
     *
     *   increaseAvailableCopies(): void {
     *     this.availableCopies++;
     *   }
     *
     *   isAvailable(): boolean {
     *     return this.availableCopies > 0;
     *   }
     * }
     * ```
     */
    entities: Folder;
    /**
     * ValueObjects trong domain clean architecture là các đối tượng giá trị, không có định danh riêng.
     * Chúng đại diện cho các giá trị bất biến và được so sánh dựa trên giá trị của chúng thay vì định danh.
     * ValueObjects thường được sử dụng để biểu diễn các khái niệm như tiền tệ, ngày tháng, hoặc các đơn vị đo lường.
     * - Lợi ích của việc sử dụng ValueObjects:
     *   + Đảm bảo tính toàn vẹn của dữ liệu bằng cách ngăn chặn các thay đổi không mong muốn.
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách sử dụng các đối tượng có ý nghĩa cụ thể.
     *   + Giảm sự phức tạp trong việc quản lý các giá trị bất biến.
     * - Example:
     * ```typescript
     * class ISBN {
     *   private value: string;
     *
     *   constructor(isbn: string) {
     *     if (!this.isValid(isbn)) {
     *       throw new Error("ISBN không hợp lệ");
     *     }
     *     this.value = this.format(isbn);
     *   }
     *
     *   private isValid(isbn: string): boolean {
     *     // Loại bỏ các ký tự không phải số và 'X'
     *     const cleanISBN = isbn.replace(/[^\dX]/gi, '');
     *
     *     // Kiểm tra độ dài
     *     if (cleanISBN.length !== 10 && cleanISBN.length !== 13) {
     *       return false;
     *     }
     *
     *     // Kiểm tra tính hợp lệ của ISBN-10
     *     if (cleanISBN.length === 10) {
     *       let sum = 0;
     *       for (let i = 0; i < 9; i++) {
     *         sum += parseInt(cleanISBN[i]) * (10 - i);
     *       }
     *       const checkDigit = (11 - (sum % 11)) % 11;
     *       return checkDigit === 10 ? cleanISBN[9].toUpperCase() === 'X' : parseInt(cleanISBN[9]) === checkDigit;
     *     }
     *
     *     // Kiểm tra tính hợp lệ của ISBN-13
     *     if (cleanISBN.length === 13) {
     *       let sum = 0;
     *       for (let i = 0; i < 12; i++) {
     *         sum += parseInt(cleanISBN[i]) * (i % 2 === 0 ? 1 : 3);
     *       }
     *       const checkDigit = (10 - (sum % 10)) % 10;
     *       return parseInt(cleanISBN[12]) === checkDigit;
     *     }
     *
     *     return false;
     *   }
     *
     *   private format(isbn: string): string {
     *     const cleanISBN = isbn.replace(/[^\dX]/gi, '');
     *     if (cleanISBN.length === 10) {
     *       return `${cleanISBN.slice(0, 1)}-${cleanISBN.slice(1, 3)}-${cleanISBN.slice(3, 9)}-${cleanISBN.slice(9)}`;
     *     } else {
     *       return `${cleanISBN.slice(0, 3)}-${cleanISBN.slice(3, 4)}-${cleanISBN.slice(4, 6)}-${cleanISBN.slice(6, 12)}-${cleanISBN.slice(12)}`;
     *     }
     *   }
     *
     *   getValue(): string {
     *     return this.value;
     *   }
     *
     *   equals(other: ISBN): boolean {
     *     return this.value === other.value;
     *   }
     *
     *   toString(): string {
     *     return this.value;
     *   }
     * }
     * ```
     */
    valueObjects: Folder;
    /**
     * Aggregates là một tập hợp của các thực thể và đối tượng giá trị có liên quan chặt chẽ với nhau.
     * Chúng được coi là một đơn vị nhất quán và được quản lý bởi một thực thể gốc (root entity).
     * Mọi thay đổi đối với các thực thể hoặc đối tượng giá trị bên trong aggregate phải thông qua thực thể gốc này.
     * Điều này giúp đảm bảo tính toàn vẹn và nhất quán của dữ liệu trong hệ thống.
     * - Lợi ích của việc sử dụng aggregates:
     *   + Đảm bảo tính nhất quán và toàn vẹn của dữ liệu bằng cách giới hạn các thay đổi trong phạm vi của aggregate.
     *   + Giảm sự phức tạp trong việc quản lý các thực thể liên quan bằng cách nhóm chúng lại với nhau.
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách sử dụng các cụm thực thể có ý nghĩa cụ thể.
     *   + Hỗ trợ việc thiết kế các giao dịch ngắn gọn và hiệu quả hơn.
     * - Example:
     * ```typescript
     * import { Book } from '../entities/Book';
     * import { Member } from '../entities/Member';
     * import { LoanStatus } from '../valueObjects/LoanStatus';
     * import { LoanDuration } from '../valueObjects/LoanDuration';
     * import { LoanId } from '../valueObjects/LoanId';
     *
     * class Loan {
     *   private id: LoanId;
     *   private book: Book;
     *   private member: Member;
     *   private loanDate: Date;
     *   private dueDate: Date;
     *   private returnDate: Date | null;
     *   private status: LoanStatus;
     *
     *   constructor(
     *     id: LoanId,
     *     book: Book,
     *     member: Member,
     *     loanDate: Date,
     *     duration: LoanDuration
     *   ) {
     *     this.id = id;
     *     this.book = book;
     *     this.member = member;
     *     this.loanDate = loanDate;
     *     this.dueDate = this.calculateDueDate(loanDate, duration);
     *     this.returnDate = null;
     *     this.status = LoanStatus.ACTIVE;
     *
     *     this.book.decreaseAvailableCopies();
     *   }
     *
     *   private calculateDueDate(loanDate: Date, duration: LoanDuration): Date {
     *     const dueDate = new Date(loanDate);
     *     dueDate.setDate(dueDate.getDate() + duration.getDays());
     *     return dueDate;
     *   }
     *
     *   getId(): LoanId {
     *     return this.id;
     *   }
     *
     *   getBook(): Book {
     *     return this.book;
     *   }
     *
     *   getMember(): Member {
     *     return this.member;
     *   }
     *
     *   getLoanDate(): Date {
     *     return this.loanDate;
     *   }
     *
     *   getDueDate(): Date {
     *     return this.dueDate;
     *   }
     *
     *   getReturnDate(): Date | null {
     *     return this.returnDate;
     *   }
     *
     *   getStatus(): LoanStatus {
     *     return this.status;
     *   }
     *
     *   returnBook(returnDate: Date): void {
     *     if (this.status !== LoanStatus.ACTIVE) {
     *       throw new Error("Không thể trả sách cho khoản vay không hoạt động");
     *     }
     *
     *     this.returnDate = returnDate;
     *     this.status = LoanStatus.RETURNED;
     *     this.book.increaseAvailableCopies();
     *   }
     *
     *   extendLoan(newDuration: LoanDuration): void {
     *     if (this.status !== LoanStatus.ACTIVE) {
     *       throw new Error("Không thể gia hạn khoản vay không hoạt động");
     *     }
     *
     *     if (this.isOverdue()) {
     *       throw new Error("Không thể gia hạn khoản vay quá hạn");
     *     }
     *
     *     this.dueDate = this.calculateDueDate(this.dueDate, newDuration);
     *   }
     *
     *   isOverdue(): boolean {
     *     return this.status === LoanStatus.ACTIVE && new Date() > this.dueDate;
     *   }
     * }
     *
     * // Giả sử chúng ta đã có các đối tượng Book, Member, và các value objects cần thiết
     * const book = new Book(...);
     * const member = new Member(...);
     * const loanId = new LoanId("LOAN123");
     * const loanDuration = new LoanDuration(14); // 14 ngày
     *
     * const loan = new Loan(loanId, book, member, new Date(), loanDuration);
     *
     * // Gia hạn khoản vay
     * const extensionDuration = new LoanDuration(7); // 7 ngày
     * loan.extendLoan(extensionDuration);
     *
     * // Trả sách
     * loan.returnBook(new Date());
     *
     * // Kiểm tra trạng thái
     * console.log(loan.getStatus()); // LoanStatus.RETURNED
     * ```
     */
    aggregates: Folder;
    /**
     * Repositories là INTERFACE các kho lưu trữ để truy xuất và lưu trữ các thực thể trong hệ thống.
     * Chúng cung cấp một giao diện trừu tượng để làm việc với dữ liệu, giúp tách biệt logic nghiệp vụ
     * khỏi các chi tiết cụ thể của việc truy xuất dữ liệu. Repositories thường sử dụng các kỹ thuật như
     * ORM (Object-Relational Mapping) để ánh xạ các thực thể vào cơ sở dữ liệu.
     * - Lợi ích của việc sử dụng repositories:
     *   + Đảm bảo tính nhất quán và toàn vẹn của dữ liệu.
     *   + Dễ dàng thay đổi hoặc nâng cấp cơ sở dữ liệu mà không ảnh hưởng đến logic nghiệp vụ.
     *   + Tăng khả năng kiểm thử bằng cách cho phép sử dụng các mock repositories.
     * - Example:
     * ```typescript
     * import { Loan } from '../aggregates/Loan';
     * import { LoanId } from '../valueObjects/LoanId';
     * import { Member } from '../entities/Member';
     * import { Book } from '../entities/Book';
     *
     * interface LoanRepository {
     *   save(loan: Loan): Promise<void>;
     *   findById(id: LoanId): Promise<Loan | null>;
     *   findActiveLoansForMember(member: Member): Promise<Loan[]>;
     *   findOverdueLoans(): Promise<Loan[]>;
     *   findLoansByBook(book: Book): Promise<Loan[]>;
     *   delete(loan: Loan): Promise<void>;
     * }
     *
     * export { LoanRepository };
     * ```
     */
    repositories: Folder;
    /**
     * Services trong domain clean architecture là các dịch vụ miền, chứa logic nghiệp vụ không thuộc về thực thể nào.
     * Chúng thường được sử dụng để thực hiện các tác vụ phức tạp hoặc các quy trình nghiệp vụ liên quan đến nhiều thực thể.
     * Services giúp tách biệt logic nghiệp vụ khỏi các thực thể, giúp mã nguồn dễ bảo trì và mở rộng.
     * - Lợi ích của việc sử dụng services:
     *   + Tăng tính tái sử dụng của mã nguồn.
     *   + Giảm sự phụ thuộc giữa các thành phần trong hệ thống.
     *   + Dễ dàng kiểm thử và bảo trì.
     *   + Tăng tính linh hoạt trong việc thay đổi hoặc mở rộng logic nghiệp vụ.
     * - Example:
     * ```typescript
     * import { Loan } from '../aggregates/Loan';
     * import { Book } from '../entities/Book';
     * import { Member } from '../entities/Member';
     * import { LoanRepository } from '../repositories/LoanRepository';
     * import { LoanDuration } from '../valueObjects/LoanDuration';
     * import { LoanId } from '../valueObjects/LoanId';
     *
     * class LoanService {
     *   private loanRepository: LoanRepository;
     *
     *   constructor(loanRepository: LoanRepository) {
     *     this.loanRepository = loanRepository;
     *   }
     *
     *   async createLoan(book: Book, member: Member, duration: LoanDuration): Promise<Loan> {
     *     if (!book.isAvailable()) {
     *       throw new Error("Sách không khả dụng để cho mượn");
     *     }
     *
     *     if (!member.canBorrow()) {
     *       throw new Error("Thành viên không đủ điều kiện để mượn sách");
     *     }
     *
     *     const loanId = LoanId.generate();
     *     const loan = new Loan(loanId, book, member, new Date(), duration);
     *
     *     await this.loanRepository.save(loan);
     *     return loan;
     *   }
     *
     *   async returnLoan(loanId: LoanId): Promise<void> {
     *     const loan = await this.loanRepository.findById(loanId);
     *     if (!loan) {
     *       throw new Error("Không tìm thấy khoản vay");
     *     }
     *
     *     loan.returnBook(new Date());
     *     await this.loanRepository.save(loan);
     *   }
     *
     *   async extendLoan(loanId: LoanId, newDuration: LoanDuration): Promise<void> {
     *     const loan = await this.loanRepository.findById(loanId);
     *     if (!loan) {
     *       throw new Error("Không tìm thấy khoản vay");
     *     }
     *
     *     loan.extendLoan(newDuration);
     *     await this.loanRepository.save(loan);
     *   }
     *
     *   async getOverdueLoans(): Promise<Loan[]> {
     *     return await this.loanRepository.findOverdueLoans();
     *   }
     *
     *   async getMemberActiveLoans(member: Member): Promise<Loan[]> {
     *     return await this.loanRepository.findActiveLoansForMember(member);
     *   }
     *
     *   async getBookLoanHistory(book: Book): Promise<Loan[]> {
     *     return await this.loanRepository.findLoansByBook(book);
     *   }
     * }
     *
     * export { LoanService };
     *
     * ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     * // Trong một use case hoặc application service
     * import { LoanService } from '../domain/services/LoanService';
     * import { MongoLoanRepository } from '../infrastructure/repositories/MongoLoanRepository';
     *
     * // Khởi tạo
     * const loanRepository = new MongoLoanRepository();
     * const loanService = new LoanService(loanRepository);
     *
     * // Sử dụng trong một use case
     * async function borrowBook(bookId: string, memberId: string, durationDays: number) {
     *   const book = await bookRepository.findById(bookId);
     *   const member = await memberRepository.findById(memberId);
     *   const duration = new LoanDuration(durationDays);
     *
     *   try {
     *     const loan = await loanService.createLoan(book, member, duration);
     *     return {
     *       success: true,
     *       loanId: loan.getId().toString(),
     *       dueDate: loan.getDueDate()
     *     };
     *   } catch (error) {
     *     return {
     *       success: false,
     *       message: error.message
     *     };
     *   }
     * }
     * ```
     */
    services: Folder;
    /**
     * Exceptions trong domain clean architecture là các ngoại lệ được sử dụng để xử lý các tình huống lỗi hoặc bất thường trong hệ thống.
     * Chúng giúp tách biệt logic xử lý lỗi khỏi logic nghiệp vụ chính, làm cho mã nguồn dễ đọc và bảo trì hơn.
     * Exceptions có thể được sử dụng để biểu diễn các lỗi nghiệp vụ, lỗi hệ thống, hoặc các tình huống không mong muốn khác.
     * - Lợi ích của việc sử dụng exceptions:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic xử lý lỗi.
     *   + Giúp quản lý và xử lý các tình huống lỗi một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các loại ngoại lệ mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các tình huống lỗi.
     * - Example:
     * ```typescript
     * export abstract class DomainException extends Error {
     *   constructor(message: string) {
     *     super(message);
     *     this.name = this.constructor.name;
     *   }
     * }
     *
     * export class BookNotAvailableException extends DomainException {
     *   constructor(bookId: string) {
     *     super(`Sách với ID ${bookId} không khả dụng để cho mượn.`);
     *   }
     * }
     *
     * export class MemberCannotBorrowException extends DomainException {
     *   constructor(memberId: string, reason: string) {
     *     super(`Thành viên với ID ${memberId} không thể mượn sách: ${reason}`);
     *   }
     * }
     * ```
     */
    exceptions: Folder;
    /**
     * Events trong domain clean architecture là các sự kiện đại diện cho các thay đổi trạng thái hoặc các hành động quan trọng trong hệ thống.
     * Chúng giúp tách biệt logic xử lý sự kiện khỏi logic nghiệp vụ chính, làm cho mã nguồn dễ đọc và bảo trì hơn.
     * Events có thể được sử dụng để thông báo cho các thành phần khác trong hệ thống về các thay đổi hoặc hành động đã xảy ra.
     * - Lợi ích của việc sử dụng events:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic xử lý sự kiện.
     *   + Giúp quản lý và xử lý các sự kiện một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các loại sự kiện mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các sự kiện.
     *   + Hỗ trợ kiến trúc hướng sự kiện (event-driven architecture) giúp hệ thống linh hoạt và phản ứng nhanh hơn.
     */
    events?: Folder;
  }

  /**
   * Infrastructure trong clean architecture là lớp chịu trách nhiệm về các chi tiết kỹ thuật và cơ sở hạ tầng của hệ thống.
   * Nó bao gồm các thành phần như cơ sở dữ liệu, hệ thống tệp, mạng, và các dịch vụ bên ngoài.
   * Infrastructure giúp tách biệt các chi tiết kỹ thuật khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
   * Infrastructure nơi định nghĩa các controllers, repositories, services,... tách biệt logic nghiệp vụ, không implement bất kỳ logic nghiệp vụ nào, với triết lý các phần implement này có thể thay đổi mà không ảnh hưởng đến logic nghiệp vụ.
   * - Lợi ích của việc sử dụng infrastructure:
   *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt các chi tiết kỹ thuật.
   *   + Giúp quản lý và xử lý các chi tiết kỹ thuật một cách nhất quán và có tổ chức.
   *   + Dễ dàng mở rộng và bảo trì khi cần thêm các thành phần cơ sở hạ tầng mới.
   *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các thành phần cơ sở hạ tầng.
   *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài một cách linh hoạt và hiệu quả.
   */
  export interface Infrastructure {
    /**
     * Adapters trong infrastructure clean architecture là các thành phần chịu trách nhiệm chuyển đổi dữ liệu giữa các lớp khác nhau của hệ thống.
     * Chúng giúp tách biệt logic chuyển đổi dữ liệu khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * Adapters có thể được sử dụng để chuyển đổi dữ liệu từ định dạng này sang định dạng khác, hoặc để kết nối các thành phần khác nhau của hệ thống.
     * Adapters nơi định nghĩa các controllers (express, fastify, ...)
     * - Lợi ích của việc sử dụng adapters:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic chuyển đổi dữ liệu.
     *   + Giúp quản lý và xử lý các chuyển đổi dữ liệu một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các chuyển đổi dữ liệu mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các chuyển đổi dữ liệu.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài một cách linh hoạt và hiệu quả.
     */
    adapters: Folder;
    /**
     * Persistence trong infrastructure clean architecture là lớp chịu trách nhiệm về việc lưu trữ và truy xuất dữ liệu.
     * Nó bao gồm các thành phần như cơ sở dữ liệu, hệ thống tệp, và các kho lưu trữ dữ liệu khác.
     * Persistence giúp tách biệt logic lưu trữ dữ liệu khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * - Lợi ích của việc sử dụng persistence:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic lưu trữ dữ liệu.
     *   + Giúp quản lý và xử lý các thao tác lưu trữ dữ liệu một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các thành phần lưu trữ dữ liệu mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các thao tác lưu trữ dữ liệu.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ lưu trữ dữ liệu bên ngoài một cách linh hoạt và hiệu quả.
     */
    persistence: Folder;
    /**
     * ExternalServices trong infrastructure clean architecture là lớp chịu trách nhiệm về việc tích hợp và giao tiếp với các dịch vụ bên ngoài.
     * Nó bao gồm các thành phần như API, dịch vụ web, và các hệ thống bên ngoài khác.
     * ExternalServices giúp tách biệt logic giao tiếp với các dịch vụ bên ngoài khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * - Lợi ích của việc sử dụng externalServices:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic giao tiếp với các dịch vụ bên ngoài.
     *   + Giúp quản lý và xử lý các tích hợp với dịch vụ bên ngoài một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các tích hợp với dịch vụ bên ngoài mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các dịch vụ bên ngoài.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài một cách linh hoạt và hiệu quả.
     */
    externalServices: Folder;
    /**
     * Security trong infrastructure clean architecture là lớp chịu trách nhiệm về các vấn đề bảo mật của hệ thống.
     * Nó bao gồm các thành phần như xác thực, phân quyền, mã hóa, và các biện pháp bảo mật khác.
     * Security giúp tách biệt logic bảo mật khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * - Lợi ích của việc sử dụng security:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic bảo mật.
     *   + Giúp quản lý và xử lý các vấn đề bảo mật một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các biện pháp bảo mật mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các tình huống bảo mật.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bảo mật bên ngoài một cách linh hoạt và hiệu quả.
     */
    security: Folder;
    /**
     * Logging trong infrastructure clean architecture là lớp chịu trách nhiệm về việc ghi lại và quản lý các bản ghi (logs) của hệ thống.
     * Nó bao gồm các thành phần như các công cụ ghi log, các định dạng log, và các kho lưu trữ log.
     * Logging giúp tách biệt logic ghi log khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * - Lợi ích của việc sử dụng logging:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic ghi log.
     *   + Giúp quản lý và xử lý các bản ghi một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các thành phần ghi log mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các bản ghi.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ ghi log bên ngoài một cách linh hoạt và hiệu quả.
     */
    logging: Folder;
    /**
     * Config trong infrastructure clean architecture là lớp chịu trách nhiệm về việc quản lý cấu hình của hệ thống.
     * Nó bao gồm các thành phần như tệp cấu hình, biến môi trường, và các thiết lập cấu hình khác.
     * Config giúp tách biệt logic cấu hình khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * - Lợi ích của việc sử dụng config:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic cấu hình.
     *   + Giúp quản lý và xử lý các thiết lập cấu hình một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các thiết lập cấu hình mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các thiết lập cấu hình.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ cấu hình bên ngoài một cách linh hoạt và hiệu quả.
     */
    config: Folder;
  }

  /**
   * Application trong clean architecture là lớp chịu trách nhiệm về các trường hợp sử dụng (use cases) và các dịch vụ ứng dụng.
   * Nó bao gồm các thành phần như use cases, services, ports, và dtos.
   * Application giúp tách biệt logic nghiệp vụ khỏi các chi tiết kỹ thuật và cơ sở hạ tầng, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
   * - Lợi ích của việc sử dụng application:
   *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic nghiệp vụ.
   *   + Giúp quản lý và xử lý các trường hợp sử dụng một cách nhất quán và có tổ chức.
   *   + Dễ dàng mở rộng và bảo trì khi cần thêm các trường hợp sử dụng hoặc dịch vụ mới.
   *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các trường hợp sử dụng và dịch vụ.
   *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài một cách linh hoạt và hiệu quả.
   */
  export interface Application {
    /**
     * Commands trong CQRS (Command Query Responsibility Segregation) là các lệnh chịu trách nhiệm thay đổi trạng thái của hệ thống.
     * Chúng bao gồm các hành động như tạo, cập nhật, hoặc xóa dữ liệu.
     * Commands giúp tách biệt logic thay đổi trạng thái khỏi logic truy vấn, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * - Lợi ích của việc sử dụng commands:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic thay đổi trạng thái.
     *   + Giúp quản lý và xử lý các lệnh một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các lệnh mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các lệnh.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài một cách linh hoạt và hiệu quả.
     */
    commands?: Folder;
    /**
     * Queries trong CQRS (Command Query Responsibility Segregation) là các truy vấn chịu trách nhiệm lấy dữ liệu từ hệ thống mà không thay đổi trạng thái của nó.
     * Chúng bao gồm các hành động như tìm kiếm, lọc, và lấy dữ liệu.
     * Queries giúp tách biệt logic truy vấn khỏi logic thay đổi trạng thái, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * - Lợi ích của việc sử dụng queries:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic truy vấn.
     *   + Giúp quản lý và xử lý các truy vấn một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các truy vấn mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các truy vấn.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài một cách linh hoạt và hiệu quả.
     */
    queries?: Folder;
    /**
     * Services trong application clean architecture là các dịch vụ ứng dụng chịu trách nhiệm thực hiện các logic nghiệp vụ cụ thể.
     * Chúng giúp tách biệt logic nghiệp vụ khỏi các chi tiết kỹ thuật và cơ sở hạ tầng, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * - Lợi ích của việc sử dụng services:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic nghiệp vụ.
     *   + Giúp quản lý và xử lý các logic nghiệp vụ một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các dịch vụ mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các dịch vụ.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài một cách linh hoạt và hiệu quả.
     */
    services: Folder;
    /**
     * Ports trong application clean architecture là các giao diện (interfaces) giúp tách biệt logic nghiệp vụ khỏi các chi tiết kỹ thuật và cơ sở hạ tầng.
     * Chúng đóng vai trò như các điểm kết nối giữa các thành phần khác nhau trong hệ thống, giúp hệ thống linh hoạt và dễ bảo trì hơn.
     * - Lợi ích của việc sử dụng ports:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic nghiệp vụ khỏi các chi tiết kỹ thuật.
     *   + Giúp quản lý và xử lý các giao diện một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các giao diện mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các giao diện.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài một cách linh hoạt và hiệu quả.
     */
    ports: Folder;
    /**
     * DTOs (Data Transfer Objects) trong application clean architecture là các đối tượng được sử dụng để truyền dữ liệu giữa các lớp và các thành phần khác nhau trong hệ thống.
     * Chúng giúp tách biệt logic nghiệp vụ khỏi các chi tiết kỹ thuật và cơ sở hạ tầng, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
     * - Lợi ích của việc sử dụng DTOs:
     *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt dữ liệu truyền tải khỏi logic nghiệp vụ.
     *   + Giúp quản lý và xử lý dữ liệu truyền tải một cách nhất quán và có tổ chức.
     *   + Dễ dàng mở rộng và bảo trì khi cần thêm các đối tượng truyền tải mới.
     *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các đối tượng truyền tải.
     *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài một cách linh hoạt và hiệu quả.
     */
    dtos: Folder;
  }

  const domain: Domain = {
    entities: {},
    valueObjects: {},
    aggregates: {},
    repositories: {},
    services: {},
    events: {},
    exceptions: {},
  };

  const application: Application = {
    commands: {},
    queries: {},
    services: {},
    ports: {},
    dtos: {},
  };

  const infrastructure: Infrastructure = {
    adapters: {
      /**
       * HTTPAdapters chịu trách nhiệm chuyển đổi dữ liệu giữa các lớp khác nhau của hệ thống thông qua giao thức HTTP.
       * Chúng giúp tách biệt logic chuyển đổi dữ liệu khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
       * - Lợi ích của việc sử dụng HTTPAdapters:
       *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic chuyển đổi dữ liệu HTTP.
       *   + Giúp quản lý và xử lý các chuyển đổi dữ liệu HTTP một cách nhất quán và có tổ chức.
       *   + Dễ dàng mở rộng và bảo trì khi cần thêm các chuyển đổi dữ liệu HTTP mới.
       *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các chuyển đổi dữ liệu HTTP.
       *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài thông qua HTTP một cách linh hoạt và hiệu quả.
       */
      httpAdapters: {},

      /**
       * MessageQueueAdapters chịu trách nhiệm chuyển đổi dữ liệu giữa các lớp khác nhau của hệ thống thông qua hàng đợi tin nhắn.
       * Chúng giúp tách biệt logic chuyển đổi dữ liệu khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
       * - Lợi ích của việc sử dụng MessageQueueAdapters:
       *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic chuyển đổi dữ liệu hàng đợi tin nhắn.
       *   + Giúp quản lý và xử lý các chuyển đổi dữ liệu hàng đợi tin nhắn một cách nhất quán và có tổ chức.
       *   + Dễ dàng mở rộng và bảo trì khi cần thêm các chuyển đổi dữ liệu hàng đợi tin nhắn mới.
       *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các chuyển đổi dữ liệu hàng đợi tin nhắn.
       *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài thông qua hàng đợi tin nhắn một cách linh hoạt và hiệu quả.
       */
      messageQueueAdapters: {},

      /**
       * FileAdapters chịu trách nhiệm chuyển đổi dữ liệu giữa các lớp khác nhau của hệ thống thông qua hệ thống tệp.
       * Chúng giúp tách biệt logic chuyển đổi dữ liệu khỏi logic nghiệp vụ, làm cho mã nguồn dễ bảo trì và mở rộng hơn.
       * - Lợi ích của việc sử dụng FileAdapters:
       *   + Tăng tính rõ ràng và dễ hiểu của mã nguồn bằng cách tách biệt logic chuyển đổi dữ liệu hệ thống tệp.
       *   + Giúp quản lý và xử lý các chuyển đổi dữ liệu hệ thống tệp một cách nhất quán và có tổ chức.
       *   + Dễ dàng mở rộng và bảo trì khi cần thêm các chuyển đổi dữ liệu hệ thống tệp mới.
       *   + Tăng khả năng kiểm thử bằng cách cho phép mô phỏng các chuyển đổi dữ liệu hệ thống tệp.
       *   + Hỗ trợ tích hợp với các hệ thống và dịch vụ bên ngoài thông qua hệ thống tệp một cách linh hoạt và hiệu quả.
       */
      fileAdapters: {},
    },
    persistence: {},
    externalServices: {},
    security: {},
    logging: {},
    config: {},
  };

  const cleanArch = {
    domain,
    application: {
      useCases: {
        commands: {}, // Xử lý các lệnh thay đổi trạng thái hệ thống
        queries: {}, // Xử lý các truy vấn dữ liệu không thay đổi trạng thái
        interactors: {}, // Triển khai logic nghiệp vụ cụ thể
        validators: {}, // Kiểm tra tính hợp lệ của đầu vào
        factories: {}, // Tạo đối tượng phức tạp
        assemblers: {}, // Chuyển đổi giữa các đối tượng khác nhau
      },
      services: {
        applicationServices: {}, // Các dịch vụ ứng dụng cụ thể
        domainServices: {}, // Các dịch vụ miền
        infrastructureServices: {}, // Các dịch vụ cơ sở hạ tầng
        integrationServices: {}, // Các dịch vụ tích hợp với hệ thống bên ngoài
        notificationServices: {}, // Các dịch vụ thông báo
        schedulingServices: {}, // Các dịch vụ lập lịch
        cacheServices: {}, // Các dịch vụ bộ nhớ đệm
        loggingServices: {}, // Các dịch vụ ghi log
        securityServices: {}, // Các dịch vụ bảo mật
      },
      ports: {
        input: {
          controllers: {}, // Xử lý các yêu cầu HTTP
          graphqlResolvers: {}, // Xử lý các truy vấn và mutation GraphQL
          messageConsumers: {}, // Xử lý các tin nhắn từ hàng đợi
          commandHandlers: {}, // Xử lý các lệnh từ giao diện người dùng
          eventListeners: {}, // Lắng nghe và xử lý các sự kiện
        },
        output: {
          presenters: {}, // Định dạng dữ liệu đầu ra
          apiGateways: {}, // Giao tiếp với các dịch vụ bên ngoài
          messageProducers: {}, // Gửi tin nhắn đến hàng đợi
          notificationSenders: {}, // Gửi thông báo
          fileExporters: {}, // Xuất dữ liệu ra file
        },
      },
      dtos: {
        requestDtos: {}, // DTOs cho dữ liệu đầu vào từ client
        responseDtos: {}, // DTOs cho dữ liệu trả về cho client
        internalDtos: {}, // DTOs sử dụng nội bộ giữa các lớp
        validationDtos: {}, // DTOs cho việc xác thực dữ liệu
        mappingDtos: {}, // DTOs cho việc ánh xạ giữa các đối tượng
        pagingDtos: {}, // DTOs cho phân trang
        filterDtos: {}, // DTOs cho bộ lọc
        sortDtos: {}, // DTOs cho sắp xếp
        aggregateDtos: {}, // DTOs cho dữ liệu tổng hợp
        reportDtos: {}, // DTOs cho báo cáo
      },
    },
    infrastructure: {
      persistence: {
        repositories: {},
        orm: {},
        migrations: {},
      },
      externalServices: {
        httpClients: {},
        messageBrokers: {},
        caching: {},
      },
      security: {},
      logging: {},
      config: {},
    },
    interfaces: {
      controllers: {
        httpControllers: {}, // Xử lý các yêu cầu HTTP RESTful
        webSocketControllers: {}, // Xử lý các kết nối WebSocket
        graphqlControllers: {}, // Xử lý các yêu cầu GraphQL
      },
      presenters: {
        jsonPresenters: {}, // Định dạng dữ liệu JSON
        xmlPresenters: {}, // Định dạng dữ liệu XML
        csvPresenters: {}, // Định dạng dữ liệu CSV
        pdfPresenters: {}, // Tạo báo cáo PDF
      },
      viewModels: {
        listViewModels: {}, // Mô hình dữ liệu cho danh sách
        detailViewModels: {}, // Mô hình dữ liệu cho chi tiết
        formViewModels: {}, // Mô hình dữ liệu cho biểu mẫu
        dashboardViewModels: {}, // Mô hình dữ liệu cho bảng điều khiển
      },
      middlewares: {
        authMiddlewares: {}, // Xác thực người dùng
        loggingMiddlewares: {}, // Ghi log cho mỗi yêu cầu
        errorHandlingMiddlewares: {}, // Xử lý lỗi chung
        corsMiddlewares: {}, // Cấu hình CORS
        rateLimitingMiddlewares: {}, // Giới hạn tốc độ yêu cầu
      },
    },
  };

  const structure = {
    apps: {
      api: {},
      cli: {},
    },
    modules: {
      auth: cleanArch,
      user: cleanArch,
    },
    utils: {},
    libs: {
      schedule: {},
      mongodb: {},
      kafka: {},
      logger: {},
    },
  };
}
