package com.ii.app.models;

import com.ii.app.models.enums.Currency;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeCurrency
{
        @Id
        @GeneratedValue (strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne (fetch = FetchType.EAGER)
        @JoinColumn (name = "bank_account_id", nullable = false)
        private BankAccount bankAccount;

        @Column (name = "source_currency")
        private Currency sourceCurrency;

        @Column (name = "destined_currency")
        private Currency destCurrency;

        @Column (name = "balance")
        private float balance;

        @Column (name = "balance_after_exchange")
        private BigDecimal balanceAfterExchange;

        @Column (name = "date")
        private Instant date;
}
